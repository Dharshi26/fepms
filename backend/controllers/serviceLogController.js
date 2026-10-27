const ServiceLog = require('../models/ServiceLog');
const MaintenanceSchedule = require('../models/MaintenanceSchedule');
const Notification = require('../models/Notification');
const User = require('../models/User');

const getServiceLogs = async (req, res, next) => {
  try {
    const { equipment, franchise, outlet, technician, approvalStatus, page = 1, limit = 10 } = req.query;
    const query = {};

    if (equipment) query.equipment = equipment;
    if (franchise) query.franchise = franchise;
    if (outlet) query.outlet = outlet;
    if (approvalStatus) query['managerApproval.status'] = approvalStatus;

    if (req.user.role === 'technician') query.technician = req.user._id;
    else if (technician) query.technician = technician;

    if (req.user.role === 'manager') {
      query.franchise = { $in: req.user.assignedFranchises };
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await ServiceLog.countDocuments(query);
    const logs = await ServiceLog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('equipment', 'name equipmentId')
      .populate('franchise', 'name')
      .populate('outlet', 'name')
      .populate('technician', 'name email')
      .populate('managerApproval.approvedBy', 'name');

    res.json({
      success: true,
      data: logs,
      pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
};

const getServiceLog = async (req, res, next) => {
  try {
    const log = await ServiceLog.findById(req.params.id)
      .populate('equipment', 'name equipmentId category type brand')
      .populate('franchise', 'name code')
      .populate('outlet', 'name code')
      .populate('technician', 'name email phone')
      .populate('maintenanceSchedule', 'title scheduledDate')
      .populate('managerApproval.approvedBy', 'name');

    if (!log) return res.status(404).json({ success: false, message: 'Service log not found' });

    if (req.user.role === 'technician' && String(log.technician._id) !== String(req.user._id)) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.json({ success: true, data: log });
  } catch (error) {
    next(error);
  }
};

const createServiceLog = async (req, res, next) => {
  try {
    const log = await ServiceLog.create({ ...req.body, createdBy: req.user._id });

    // Notify managers/admins
    const admins = await User.find({ role: { $in: ['admin', 'manager'] }, isActive: true });
    const notifications = admins.map((u) => ({
      user: u._id,
      type: 'service_log_submitted',
      title: 'New Service Log Submitted',
      message: `A service log has been submitted and is awaiting review.`,
      relatedModel: 'ServiceLog',
      relatedId: log._id,
    }));
    await Notification.insertMany(notifications, { ordered: false }).catch(() => {}); // ignore dup key

    res.status(201).json({ success: true, data: log });
  } catch (error) {
    next(error);
  }
};

const updateServiceLog = async (req, res, next) => {
  try {
    const log = await ServiceLog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!log) return res.status(404).json({ success: false, message: 'Service log not found' });
    res.json({ success: true, data: log });
  } catch (error) {
    next(error);
  }
};

const deleteServiceLog = async (req, res, next) => {
  try {
    const log = await ServiceLog.findByIdAndDelete(req.params.id);
    if (!log) return res.status(404).json({ success: false, message: 'Service log not found' });
    res.json({ success: true, message: 'Service log deleted' });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/service-logs/:id/approve
const approveServiceLog = async (req, res, next) => {
  try {
    const log = await ServiceLog.findByIdAndUpdate(
      req.params.id,
      {
        'managerApproval.status': 'Approved',
        'managerApproval.approvedBy': req.user._id,
        'managerApproval.approvedAt': new Date(),
        'managerApproval.remarks': req.body.remarks || '',
      },
      { new: true }
    );
    if (!log) return res.status(404).json({ success: false, message: 'Service log not found' });

    // Complete the linked maintenance schedule
    if (log.maintenanceSchedule) {
      await MaintenanceSchedule.findByIdAndUpdate(log.maintenanceSchedule, {
        status: 'Completed',
        completionDate: new Date(),
      });
    }

    // Notify technician
    await Notification.create({
      user: log.technician,
      type: 'service_log_approved',
      title: 'Service Log Approved',
      message: `Your service log ${log.serviceLogId} has been approved.`,
      relatedModel: 'ServiceLog',
      relatedId: log._id,
    }).catch(() => {});

    res.json({ success: true, data: log });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/service-logs/:id/reject
const rejectServiceLog = async (req, res, next) => {
  try {
    const log = await ServiceLog.findByIdAndUpdate(
      req.params.id,
      {
        'managerApproval.status': 'Rejected',
        'managerApproval.approvedBy': req.user._id,
        'managerApproval.approvedAt': new Date(),
        'managerApproval.remarks': req.body.remarks || '',
      },
      { new: true }
    );
    if (!log) return res.status(404).json({ success: false, message: 'Service log not found' });

    await Notification.create({
      user: log.technician,
      type: 'service_log_rejected',
      title: 'Service Log Rejected',
      message: `Your service log ${log.serviceLogId} has been rejected. Remarks: ${req.body.remarks || 'N/A'}`,
      relatedModel: 'ServiceLog',
      relatedId: log._id,
    }).catch(() => {});

    res.json({ success: true, data: log });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getServiceLogs,
  getServiceLog,
  createServiceLog,
  updateServiceLog,
  deleteServiceLog,
  approveServiceLog,
  rejectServiceLog,
};
