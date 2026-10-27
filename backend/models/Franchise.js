const mongoose = require('mongoose');

const franchiseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Franchise name is required'],
      trim: true,
      minlength: [3, 'Franchise name must be at least 3 characters'],
      maxlength: [100, 'Franchise name cannot exceed 100 characters'],
    },
    code: {
      type: String,
      required: [true, 'Franchise code is required'],
      unique: true,
      uppercase: true,
      trim: true,
      match: [/^[A-Z0-9]{3,10}$/, 'Franchise code must be 3-10 alphanumeric characters'],
    },
    contactPerson: {
      type: String,
      trim: true,
      minlength: [2, 'Contact person name must be at least 2 characters'],
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Valid email is required'],
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[0-9\s\-\(\)\+]{7,}$/, 'Valid phone number is required'],
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

// Indexes for common queries
franchiseSchema.index({ code: 1 });
franchiseSchema.index({ status: 1 });
franchiseSchema.index({ createdBy: 1 });
franchiseSchema.index({ name: 'text', code: 'text' });

module.exports = mongoose.model('Franchise', franchiseSchema);
