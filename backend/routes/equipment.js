const express = require('express');
const router = express.Router();
const {
  getEquipment, getEquipmentById, createEquipment, updateEquipment, deleteEquipment,
} = require('../controllers/equipmentController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(authorize('admin', 'manager', 'technician'), getEquipment)
  .post(authorize('admin', 'manager'), createEquipment);

router.route('/:id')
  .get(authorize('admin', 'manager', 'technician'), getEquipmentById)
  .put(authorize('admin', 'manager'), updateEquipment)
  .delete(authorize('admin'), deleteEquipment);

module.exports = router;
