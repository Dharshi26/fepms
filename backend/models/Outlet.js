const mongoose = require('mongoose');

const outletSchema = new mongoose.Schema(
  {
    franchise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Franchise',
      required: [true, 'Franchise is required'],
    },
    name: {
      type: String,
      required: [true, 'Outlet name is required'],
      trim: true,
      minlength: [3, 'Outlet name must be at least 3 characters'],
      maxlength: [100, 'Outlet name cannot exceed 100 characters'],
    },
    code: {
      type: String,
      required: [true, 'Outlet code is required'],
      uppercase: true,
      trim: true,
      match: [/^[A-Z0-9]{3,10}$/, 'Outlet code must be 3-10 alphanumeric characters'],
    },
    address: {
      type: String,
      trim: true,
      minlength: [5, 'Address must be at least 5 characters'],
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    postalCode: {
      type: String,
      trim: true,
    },
    contactPerson: {
      type: String,
      trim: true,
      minlength: [2, 'Contact person name must be at least 2 characters'],
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[0-9\s\-\(\)\+]{7,}$/, 'Valid phone number is required'],
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Valid email is required'],
    },
    status: {
      type: String,
      enum: {
        values: ['active', 'inactive'],
        message: 'Status must be either active or inactive',
      },
      default: 'active',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique index: code must be unique within a franchise
outletSchema.index({ franchise: 1, code: 1 }, { unique: true });

// Additional indexes for common queries
outletSchema.index({ franchise: 1, status: 1 });
outletSchema.index({ createdBy: 1 });
outletSchema.index({ name: 'text', code: 'text' });

module.exports = mongoose.model('Outlet', outletSchema);
