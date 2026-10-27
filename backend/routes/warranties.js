const express = require('express');
const router = express.Router();
const { getWarranties, getWarranty, createWarranty, updateWarranty, deleteWarranty } = require('../controllers/warrantyController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.use(protect);

router.route('/')
  .get(authorize('admin', 'manager', 'technician'), getWarranties)
  .post(authorize('admin', 'manager'), upload.single('document'), createWarranty);

router.route('/:id')
  .get(authorize('admin', 'manager', 'technician'), getWarranty)
  .put(authorize('admin', 'manager'), updateWarranty)
  .delete(authorize('admin'), deleteWarranty);

module.exports = router;
