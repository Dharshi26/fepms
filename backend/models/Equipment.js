const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema(
  {
    // ── Identity ──────────────────────────────────────────────────────────
    equipmentId: {
      type: String,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Equipment name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Commercial Kitchen', 'Refrigeration'],
    },
    type: {
      type: String,
      required: [true, 'Equipment type is required'],
      trim: true,
      // Stored as free-text to allow new types without schema changes
    },
    brand: { type: String, trim: true },
    modelNumber: { type: String, trim: true },
    serialNumber: { type: String, trim: true },

    // ── Location ──────────────────────────────────────────────────────────
    franchise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Franchise',
      required: [true, 'Franchise is required'],
    },
    outlet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Outlet',
      required: [true, 'Outlet is required'],
    },
    areaLocation: { type: String, trim: true },

    // ── Purchase ──────────────────────────────────────────────────────────
    purchaseDate: { type: Date },
    installationDate: { type: Date },
    purchaseCost: { type: Number, min: 0 },
    vendor: { type: String, trim: true },

    // ── Maintenance ───────────────────────────────────────────────────────
    maintenanceFrequency: {
      type: String,
      enum: ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Half-Yearly', 'Yearly', 'Custom'],
      default: 'Monthly',
    },
    lastMaintenanceDate: { type: Date },
    nextMaintenanceDate: { type: Date },
    assignedTechnician: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    serviceProvider: { type: String, trim: true },

    // ── Warranty (quick reference – full warranty in Warranty model) ───────
    warrantyProvider: { type: String, trim: true },
    warrantyNumber: { type: String, trim: true },
    warrantyStartDate: { type: Date },
    warrantyExpiryDate: { type: Date },

    // ── Status ────────────────────────────────────────────────────────────
    status: {
      type: String,
      enum: ['Active', 'Under Maintenance', 'Out of Service', 'Retired'],
      default: 'Active',
    },

    notes: { type: String, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// Auto-generate equipmentId before first save
equipmentSchema.pre('save', async function (next) {
  if (!this.equipmentId) {
    const count = await mongoose.model('Equipment').countDocuments();
    this.equipmentId = `EQ-${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Equipment', equipmentSchema);
