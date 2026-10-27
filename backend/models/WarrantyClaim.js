const mongoose = require('mongoose');

const warrantyClaimSchema = new mongoose.Schema(
  {
    claimId: { type: String, unique: true, trim: true },
    equipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Equipment',
      required: true,
    },
    warranty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Warranty',
      required: true,
    },
    claimDate: { type: Date, required: true, default: Date.now },
    claimNumber: { type: String, trim: true },
    issue: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    serviceProvider: { type: String, trim: true },
    claimAmount: { type: Number, min: 0, default: 0 },
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Approved', 'Rejected', 'Resolved'],
      default: 'Open',
    },
    resolution: { type: String, trim: true },
    resolutionDate: { type: Date },
    remarks: { type: String, trim: true },
    supportingDocuments: [
      {
        fileName: { type: String },
        fileUrl: { type: String },
        fileType: { type: String },
        fileSize: { type: Number },
        uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

warrantyClaimSchema.pre('save', async function (next) {
  if (!this.claimId) {
    const count = await mongoose.model('WarrantyClaim').countDocuments();
    this.claimId = `WC-${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

module.exports = mongoose.model('WarrantyClaim', warrantyClaimSchema);
