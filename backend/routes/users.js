const express = require('express');
const router = express.Router();
const { getUsers, getUserById, updateUser, deactivateUser } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.get('/', authorize('admin'), getUsers);
router.get('/:id', authorize('admin', 'manager'), getUserById);
router.put('/:id', authorize('admin'), updateUser);
router.patch('/:id/deactivate', authorize('admin'), deactivateUser);

module.exports = router;
