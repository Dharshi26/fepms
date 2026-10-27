const express = require('express');
const router = express.Router();
const {
  getStats,
  getUpcomingMaintenance,
  getOverdueMaintenance,
  getExpiringWarranties,
  getRecentServiceLogs,
} = require('../controllers/dashboardController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect, authorize('admin', 'manager'));

router.get('/stats', getStats);
router.get('/upcoming-maintenance', getUpcomingMaintenance);
router.get('/overdue-maintenance', getOverdueMaintenance);
router.get('/expiring-warranties', getExpiringWarranties);
router.get('/recent-service-logs', getRecentServiceLogs);

module.exports = router;
