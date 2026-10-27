const mongoose = require('mongoose');

const checklistItemSchema = new mongoose.Schema(
  {
    item: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['Passed', 'Failed', 'Not Applicable', 'Pending'],
      default: 'Pending',
    },
    remarks: { type: String, trim: true },
  },
  { _id: true }
);

const maintenanceScheduleSchema = new mongoose.Schema(
  {
    maintenanceId: { type: String, unique: true, trim: true },
    equipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Equipment',
      required: [true, 'Equipment is required'],
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
    title: {
      type: String,
      required: [true, 'Maintenance title is required'],
      trim: true,
    },
    description: { type: String, trim: true },
    maintenanceType: {
      type: String,
      enum: ['Preventive', 'Corrective', 'Inspection', 'Emergency'],
      default: 'Preventive',
    },
    frequency: {
      type: String,
      enum: ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Half-Yearly', 'Yearly', 'Custom', 'One-time'],
      default: 'Monthly',
    },
    scheduledDate: {
      type: Date,
      required: [true, 'Scheduled date is required'],
    },
    assignedTechnician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    serviceProvider: { type: String, trim: true },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Medium',
    },
    checklist: [checklistItemSchema],
    status: {
      type: String,
      enum: ['Upcoming', 'Due', 'Overdue', 'In Progress', 'Completed', 'Cancelled'],
      default: 'Upcoming',
    },
    startedAt: { type: Date },
    completionDate: { type: Date },
    notes: { type: String, trim: true },
    // Link to the parent recurring schedule (null for original)
    parentSchedule: { type: mongoose.Schema.Types.ObjectId, ref: 'MaintenanceSchedule', default: null },
    isRecurring: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// Auto-generate maintenanceId before first save
maintenanceScheduleSchema.pre('save', async function (next) {
  if (!this.maintenanceId) {
    const count = await mongoose.model('MaintenanceSchedule').countDocuments();
    this.maintenanceId = `MS-${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

// Virtual: dynamically calculate status based on date (used in controllers)
maintenanceScheduleSchema.methods.calculateStatus = function () {
  if (['Completed', 'Cancelled', 'In Progress'].includes(this.status)) {
    return this.status;
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const scheduled = new Date(this.scheduledDate);
  scheduled.setHours(0, 0, 0, 0);

  if (scheduled > today) return 'Upcoming';
  if (scheduled.getTime() === today.getTime()) return 'Due';
  return 'Overdue';
};

module.exports = mongoose.model('MaintenanceSchedule', maintenanceScheduleSchema);
