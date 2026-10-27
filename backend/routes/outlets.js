const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getOutlets,
  getOutlet,
  createOutlet,
  updateOutlet,
  deleteOutlet,
} = require('../controllers/outletController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

// Validation middleware for create/update
const validateOutlet = [
  body('franchise')
    .if(body('franchise').exists())
    .notEmpty()
    .withMessage('Franchise is required'),
  body('name')
    .if(body('name').exists())
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Name must be 3-100 characters'),
  body('code')
    .if(body('code').exists())
    .trim()
    .toUpperCase()
    .matches(/^[A-Z0-9]{3,10}$/)
    .withMessage('Code must be 3-10 alphanumeric characters'),
  body('email')
    .if(body('email').exists())
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage('Valid email is required'),
  body('phone')
    .if(body('phone').exists())
    .trim()
    .matches(/^[0-9\s\-\(\)\+]{7,}$/)
    .withMessage('Valid phone number is required'),
  body('status')
    .if(body('status').exists())
    .isIn(['active', 'inactive'])
    .withMessage('Status must be active or inactive'),
  body('description')
    .if(body('description').exists())
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
];

router
  .route('/')
  .get(authorize('admin', 'manager'), getOutlets)
  .post(authorize('admin', 'manager'), validateOutlet, createOutlet);

router
  .route('/:id')
  .get(authorize('admin', 'manager'), getOutlet)
  .put(authorize('admin', 'manager'), validateOutlet, updateOutlet)
  .delete(authorize('admin'), deleteOutlet);

module.exports = router;
