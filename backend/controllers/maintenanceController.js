const MaintenanceSchedule = require('../models/MaintenanceSchedule');
const Equipment = require('../models/Equipment');

// ── Frequency → months offset map ────────────────────────────────────────────
const FREQUENCY_MONTHS = {
  Daily: 0,       // handled separately
  Weekly: 0,      // handled separately
  Monthly: 1,
  Quarterly: 3,
  'Half-Yearly': 6,
  Yearly: 12,
};
const FREQUENCY_DAYS = {
  Daily: 1,
  Weekly: 7,
};

const calcNextDate = (completedDate, frequency) => {
  const next = new Date(completedDate);

  if (FREQUENCY_DAYS[frequency]) {
    next.setDate(next.getDate() + FREQUENCY_DAYS[frequency]);
  } else if (FREQUENCY_MONTHS[frequency]) {
    next.setMonth(next.getMonth() + FREQUENCY_MONTHS[frequency]);
  }
  // Custom / One-time: no auto-next
  return next;
};

const syncStatus = (schedule) => {
  if (['Completed', 'Cancelled', 'In Progress'].includes(schedule.status)) return schedule.status;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const scheduled = new Date(schedule.scheduledDate);
  scheduled.setHours(0, 0, 0, 0);
  if (scheduled > today) return 'Upcoming';
  if (scheduled.getTime() === today.getTime()) return 'Due';
  return 'Overdue';
};

const getMaintenance = async (req, res, next) => {
  try {
    const { search, status, franchise, outlet, technician, priority, page = 1, limit = 10 } = req.query;
    const query = {};

    if (search) query.$or = [{ title: { $regex: search, $options: 'i' } }];
    if (franchise) query.franchise = franchise;
    if (outlet) query.outlet = outlet;
    if (priority) query.priority = priority;

    if (req.user.role === 'technician') {
      query.assignedTechnician = req.user._id;
    } else if (technician) {
      query.assignedTechnician = technician;
    }
    if (req.user.role === 'manager') {
      query.franchise = { $in: req.user.assignedFranchises };
    }

    // Sync date-based statuses before returning
    // (lightweight: only applied when status filter is requested)
    if (status) query.status = status;

    const skip = (Number(page) - 1) * Number(limit);
    const total = await MaintenanceSchedule.countDocuments(query);
    const records = await MaintenanceSchedule.find(query)
      .sort({ scheduledDate: 1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('equipment', 'name equipmentId category')
      .populate('franchise', 'name code')
      .populate('outlet', 'name code')
      .populate('assignedTechnician', 'name email');

    // Sync status in-memory and persist any changed ones
    const updates = [];
    const synced = records.map((r) => {
      const computed = syncStatus(r);
      if (computed !== r.status) {
        updates.push(MaintenanceSchedule.findByIdAndUpdate(r._id, { status: computed }));
        r.status = computed;
      }
      return r;
    });
    if (updates.length) await Promise.all(updates);

    res.json({
      success: true,
      data: synced,
      pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
};

const getMaintenanceById = async (req, res, next) => {
  try {
    const schedule = await MaintenanceSchedule.findById(req.params.id)
      .populate('equipment', 'name equipmentId category type brand')
      .populate('franchise', 'name code')
      .populate('outlet', 'name code')
      .populate('assignedTechnician', 'name email phone');

    if (!schedule) return res.status(404).json({ success: false, message: 'Maintenance record not found' });

    // Sync status
    const computed = syncStatus(schedule);
    if (computed !== schedule.status) {
      schedule.status = computed;
      await schedule.save();
    }

    res.json({ success: true, data: schedule });
  } catch (error) {
    next(error);
  }
};

const createMaintenance = async (req, res, next) => {
  try {
    const schedule = await MaintenanceSchedule.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json({ success: true, data: schedule });
  } catch (error) {
    next(error);
  }
};

const updateMaintenance = async (req, res, next) => {
  try {
    const schedule = await MaintenanceSchedule.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!schedule) return res.status(404).json({ success: false, message: 'Maintenance record not found' });
    res.json({ success: true, data: schedule });
  } catch (error) {
    next(error);
  }
};

const deleteMaintenance = async (req, res, next) => {
  try {
    const schedule = await MaintenanceSchedule.findByIdAndUpdate(
      req.params.id,
      { status: 'Cancelled' },
      { new: true }
    );
    if (!schedule) return res.status(404).json({ success: false, message: 'Maintenance record not found' });
    res.json({ success: true, message: 'Maintenance cancelled', data: schedule });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/maintenance/:id/start
const startMaintenance = async (req, res, next) => {
  try {
    const schedule = await MaintenanceSchedule.findById(req.params.id);
    if (!schedule) return res.status(404).json({ success: false, message: 'Maintenance record not found' });

    if (req.user.role === 'technician' &&
      String(schedule.assignedTechnician) !== String(req.user._id)) {
      return res.status(403).json({ success: false, message: 'Not assigned to this task' });
    }

    schedule.status = 'In Progress';
    schedule.startedAt = new Date();
    await schedule.save();
    res.json({ success: true, data: schedule });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/maintenance/:id/complete
const completeMaintenance = async (req, res, next) => {
  try {
    const schedule = await MaintenanceSchedule.findById(req.params.id);
    if (!schedule) return res.status(404).json({ success: false, message: 'Maintenance record not found' });

    const now = new Date();
    schedule.status = 'Completed';
    schedule.completionDate = now;
    await schedule.save();

    // Update equipment last maintenance date
    await Equipment.findByIdAndUpdate(schedule.equipment, {
      lastMaintenanceDate: now,
      status: 'Active',
    });

    // Create next recurring schedule if applicable
    if (schedule.isRecurring && schedule.frequency !== 'One-time' && schedule.frequency !== 'Custom') {
      const nextDate = calcNextDate(now, schedule.frequency);
      await MaintenanceSchedule.create({
        equipment: schedule.equipment,
        franchise: schedule.franchise,
        outlet: schedule.outlet,
        title: schedule.title,
        description: schedule.description,
        maintenanceType: schedule.maintenanceType,
        frequency: schedule.frequency,
        scheduledDate: nextDate,
        assignedTechnician: schedule.assignedTechnician,
        serviceProvider: schedule.serviceProvider,
        priority: schedule.priority,
        checklist: schedule.checklist.map((c) => ({ item: c.item, status: 'Pending', remarks: '' })),
        parentSchedule: schedule._id,
        isRecurring: true,
        createdBy: schedule.createdBy,
      });

      // Update equipment next maintenance date
      await Equipment.findByIdAndUpdate(schedule.equipment, { nextMaintenanceDate: nextDate });
    }

    res.json({ success: true, data: schedule, message: 'Maintenance completed. Next schedule created.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMaintenance,
  getMaintenanceById,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
  startMaintenance,
  completeMaintenance,
};
