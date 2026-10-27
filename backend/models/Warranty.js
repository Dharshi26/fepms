const mongoose = require('mongoose');

const warrantySchema = new mongoose.Schema(
  {
    equipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Equipment',
      required: true,
    },
    warrantyProvider: { type: String, trim: true },
    warrantyNumber: { type: String, trim: true },
    warrantyType: {
      type: String,
      enum: ['Parts', 'Labour', 'Comprehensive', 'Limited', 'Extended'],
      default: 'Comprehensive',
    },
    startDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    coverage: { type: String, trim: true },
    document: {
      fileName: { type: String },
      fileUrl: { type: String },
      fileType: { type: String },
      fileSize: { type: Number },
      uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      uploadedAt: { type: Date },
    },
    notes: { type: String, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual: warranty status
warrantySchema.virtual('warrantyStatus').get(function () {
  const today = new Date();
  const expiry = new Date(this.expiryDate);
  const daysRemaining = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

  if (daysRemaining < 0) return 'Expired';
  if (daysRemaining <= 30) return 'Expiring Soon';
  return 'Active';
});

warrantySchema.virtual('daysRemaining').get(function () {
  const today = new Date();
  const expiry = new Date(this.expiryDate);
  return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
});

module.exports = mongoose.model('Warranty', warrantySchema);
