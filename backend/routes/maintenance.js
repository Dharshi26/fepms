const express = require('express');
const router = express.Router();
const {
  getMaintenance, getMaintenanceById, createMaintenance, updateMaintenance,
  deleteMaintenance, startMaintenance, completeMaintenance,
} = require('../controllers/maintenanceController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(authorize('admin', 'manager', 'technician'), getMaintenance)
  .post(authorize('admin', 'manager'), createMaintenance);

router.route('/:id')
  .get(authorize('admin', 'manager', 'technician'), getMaintenanceById)
  .put(authorize('admin', 'manager'), updateMaintenance)
  .delete(authorize('admin', 'manager'), deleteMaintenance);

router.patch('/:id/start', authorize('admin', 'manager', 'technician'), startMaintenance);
router.patch('/:id/complete', authorize('admin', 'manager', 'technician'), completeMaintenance);

module.exports = router;
