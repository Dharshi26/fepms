const express = require('express');
const router = express.Router();
const {
  getWarrantyClaims, getWarrantyClaim, createWarrantyClaim, updateWarrantyClaim,
} = require('../controllers/warrantyClaimController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(authorize('admin', 'manager'), getWarrantyClaims)
  .post(authorize('admin', 'manager'), createWarrantyClaim);

router.route('/:id')
  .get(authorize('admin', 'manager'), getWarrantyClaim)
  .put(authorize('admin', 'manager'), updateWarrantyClaim);

module.exports = router;
