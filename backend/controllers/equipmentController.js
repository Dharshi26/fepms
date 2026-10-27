const Equipment = require('../models/Equipment');

const getEquipment = async (req, res, next) => {
  try {
    const { search, status, franchise, outlet, category, page = 1, limit = 10 } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { equipmentId: { $regex: search, $options: 'i' } },
        { serialNumber: { $regex: search, $options: 'i' } },
      ];
    }
    if (status) query.status = status;
    if (franchise) query.franchise = franchise;
    if (outlet) query.outlet = outlet;
    if (category) query.category = category;

    if (req.user.role === 'manager') {
      query.franchise = { $in: req.user.assignedFranchises };
    }
    if (req.user.role === 'technician') {
      query.assignedTechnician = req.user._id;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Equipment.countDocuments(query);
    const equipment = await Equipment.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('franchise', 'name code')
      .populate('outlet', 'name code')
      .populate('assignedTechnician', 'name email');

    res.json({
      success: true,
      data: equipment,
      pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
};

const getEquipmentById = async (req, res, next) => {
  try {
    const equipment = await Equipment.findById(req.params.id)
      .populate('franchise', 'name code')
      .populate('outlet', 'name code')
      .populate('assignedTechnician', 'name email phone');

    if (!equipment) return res.status(404).json({ success: false, message: 'Equipment not found' });
    res.json({ success: true, data: equipment });
  } catch (error) {
    next(error);
  }
};

const createEquipment = async (req, res, next) => {
  try {
    const equipment = await Equipment.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json({ success: true, data: equipment });
  } catch (error) {
    next(error);
  }
};

const updateEquipment = async (req, res, next) => {
  try {
    const equipment = await Equipment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('franchise', 'name code')
      .populate('outlet', 'name code');

    if (!equipment) return res.status(404).json({ success: false, message: 'Equipment not found' });
    res.json({ success: true, data: equipment });
  } catch (error) {
    next(error);
  }
};

const deleteEquipment = async (req, res, next) => {
  try {
    const equipment = await Equipment.findByIdAndUpdate(
      req.params.id,
      { status: 'Retired' },
      { new: true }
    );
    if (!equipment) return res.status(404).json({ success: false, message: 'Equipment not found' });
    res.json({ success: true, message: 'Equipment retired', data: equipment });
  } catch (error) {
    next(error);
  }
};

module.exports = { getEquipment, getEquipmentById, createEquipment, updateEquipment, deleteEquipment };
