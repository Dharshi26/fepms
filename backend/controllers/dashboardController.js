const Franchise = require('../models/Franchise');
const Outlet = require('../models/Outlet');
const Equipment = require('../models/Equipment');
const MaintenanceSchedule = require('../models/MaintenanceSchedule');
const ServiceLog = require('../models/ServiceLog');
const Warranty = require('../models/Warranty');

// GET /api/dashboard/stats
const getStats = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const in30Days = new Date(today);
    in30Days.setDate(in30Days.getDate() + 30);

    const [
      totalFranchises,
      totalOutlets,
      totalEquipment,
      maintenanceDue,
      maintenanceOverdue,
      maintenanceCompleted,
    ] = await Promise.all([
      Franchise.countDocuments({ status: 'active' }),
      Outlet.countDocuments({ status: 'active' }),
      Equipment.countDocuments({ status: { $ne: 'Retired' } }),
      MaintenanceSchedule.countDocuments({ status: 'Due' }),
      MaintenanceSchedule.countDocuments({ status: 'Overdue' }),
      MaintenanceSchedule.countDocuments({ status: 'Completed' }),
    ]);

    // Warranty stats require virtual, so pull and filter in JS
    const warranties = await Warranty.find({});
    const warrantiesExpiringSoon = warranties.filter((w) => w.warrantyStatus === 'Expiring Soon').length;
    const warrantiesExpired = warranties.filter((w) => w.warrantyStatus === 'Expired').length;

    res.json({
      success: true,
      data: {
        totalFranchises,
        totalOutlets,
        totalEquipment,
        maintenanceDue,
        maintenanceOverdue,
        maintenanceCompleted,
        warrantiesExpiringSoon,
        warrantiesExpired,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/dashboard/upcoming-maintenance
const getUpcomingMaintenance = async (req, res, next) => {
  try {
    const records = await MaintenanceSchedule.find({
      status: { $in: ['Upcoming', 'Due'] },
    })
      .sort({ scheduledDate: 1 })
      .limit(10)
      .populate('equipment', 'name equipmentId')
      .populate('outlet', 'name')
      .populate('assignedTechnician', 'name');

    res.json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
};

// GET /api/dashboard/overdue-maintenance
const getOverdueMaintenance = async (req, res, next) => {
  try {
    const today = new Date();
    const records = await MaintenanceSchedule.find({ status: 'Overdue' })
      .sort({ scheduledDate: 1 })
      .limit(10)
      .populate('equipment', 'name equipmentId')
      .populate('outlet', 'name')
      .populate('assignedTechnician', 'name');

    const enriched = records.map((r) => ({
      ...r.toObject(),
      daysOverdue: Math.floor((today - new Date(r.scheduledDate)) / (1000 * 60 * 60 * 24)),
    }));

    res.json({ success: true, data: enriched });
  } catch (error) {
    next(error);
  }
};

// GET /api/dashboard/expiring-warranties
const getExpiringWarranties = async (req, res, next) => {
  try {
    const warranties = await Warranty.find({})
      .populate('equipment', 'name equipmentId outlet')
      .sort({ expiryDate: 1 })
      .limit(20);

    const expiring = warranties
      .filter((w) => ['Expiring Soon', 'Expired'].includes(w.warrantyStatus))
      .slice(0, 10);

    res.json({ success: true, data: expiring });
  } catch (error) {
    next(error);
  }
};

// GET /api/dashboard/recent-service-logs
const getRecentServiceLogs = async (req, res, next) => {
  try {
    const logs = await ServiceLog.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('equipment', 'name equipmentId')
      .populate('technician', 'name')
      .select('serviceLogId serviceDate inspectionResult managerApproval equipment technician');

    res.json({ success: true, data: logs });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStats,
  getUpcomingMaintenance,
  getOverdueMaintenance,
  getExpiringWarranties,
  getRecentServiceLogs,
};
