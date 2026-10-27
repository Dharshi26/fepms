const mongoose = require('mongoose');

const partReplacedSchema = new mongoose.Schema(
  {
    partName: { type: String, trim: true },
    partNumber: { type: String, trim: true },
    quantity: { type: Number, min: 1, default: 1 },
    cost: { type: Number, min: 0, default: 0 },
  },
  { _id: true }
);

const checklistResultSchema = new mongoose.Schema(
  {
    item: { type: String, required: true },
    status: {
      type: String,
      enum: ['Passed', 'Failed', 'Not Applicable'],
      required: true,
    },
    remarks: { type: String, trim: true },
  },
  { _id: true }
);

const serviceLogSchema = new mongoose.Schema(
  {
    serviceLogId: { type: String, unique: true, trim: true },
    equipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Equipment',
      required: true,
    },
    maintenanceSchedule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MaintenanceSchedule',
    },
    franchise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Franchise',
      required: true,
    },
    outlet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Outlet',
      required: true,
    },
    serviceDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    technician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    serviceProvider: { type: String, trim: true },
    maintenanceType: {
      type: String,
      enum: ['Preventive', 'Corrective', 'Inspection', 'Emergency'],
      default: 'Preventive',
    },
    workPerformed: { type: String, trim: true },
    checklistResults: [checklistResultSchema],
    issuesFound: { type: String, trim: true },
    correctiveAction: { type: String, trim: true },
    partsReplaced: [partReplacedSchema],
    labourCost: { type: Number, min: 0, default: 0 },
    partsCost: { type: Number, min: 0, default: 0 },
    serviceRemarks: { type: String, trim: true },
    inspectionResult: {
      type: String,
      enum: ['Completed', 'Follow-up Required', 'Failed Inspection'],
      default: 'Completed',
    },
    certificate: {
      fileName: { type: String },
      fileUrl: { type: String },
      fileType: { type: String },
      fileSize: { type: Number },
      uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      uploadedAt: { type: Date },
    },
    technicianSignOff: {
      signedOff: { type: Boolean, default: false },
      signedOffAt: { type: Date },
    },
    managerApproval: {
      status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
      },
      approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      approvedAt: { type: Date },
      remarks: { type: String, trim: true },
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// Auto-generate serviceLogId
serviceLogSchema.pre('save', async function (next) {
  if (!this.serviceLogId) {
    const count = await mongoose.model('ServiceLog').countDocuments();
    this.serviceLogId = `SL-${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

module.exports = mongoose.model('ServiceLog', serviceLogSchema);
