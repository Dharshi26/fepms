const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: [
        'maintenance_upcoming',
        'maintenance_due',
        'maintenance_overdue',
        'maintenance_completed',
        'warranty_expiring_30',
        'warranty_expiring_15',
        'warranty_expiring_7',
        'warranty_expired',
        'service_log_submitted',
        'service_log_awaiting_approval',
        'service_log_approved',
        'service_log_rejected',
        'claim_submitted',
        'claim_status_changed',
        'claim_resolved',
      ],
      required: true,
    },
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    relatedModel: {
      type: String,
      enum: ['MaintenanceSchedule', 'ServiceLog', 'Warranty', 'WarrantyClaim', 'Equipment'],
    },
    relatedId: { type: mongoose.Schema.Types.ObjectId },
    isRead: { type: Boolean, default: false },
    readAt: { type: Date },
  },
  { timestamps: true }
);

// Prevent duplicate notifications of the same type for the same record/user
notificationSchema.index({ user: 1, type: 1, relatedId: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('Notification', notificationSchema);
