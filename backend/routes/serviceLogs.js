const express = require('express');
const router = express.Router();
const {
  getServiceLogs, getServiceLog, createServiceLog, updateServiceLog,
  deleteServiceLog, approveServiceLog, rejectServiceLog,
} = require('../controllers/serviceLogController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.use(protect);

router.route('/')
  .get(authorize('admin', 'manager', 'technician'), getServiceLogs)
  .post(
    authorize('admin', 'manager', 'technician'),
    upload.single('certificate'),
    createServiceLog
  );

router.route('/:id')
  .get(authorize('admin', 'manager', 'technician'), getServiceLog)
  .put(authorize('admin', 'manager', 'technician'), updateServiceLog)
  .delete(authorize('admin'), deleteServiceLog);

router.patch('/:id/approve', authorize('admin', 'manager'), approveServiceLog);
router.patch('/:id/reject', authorize('admin', 'manager'), rejectServiceLog);

module.exports = router;
