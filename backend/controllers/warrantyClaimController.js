const WarrantyClaim = require('../models/WarrantyClaim');
const Notification = require('../models/Notification');

const getWarrantyClaims = async (req, res, next) => {
  try {
    const { equipment, status, page = 1, limit = 10 } = req.query;
    const query = {};
    if (equipment) query.equipment = equipment;
    if (status) query.status = status;

    const skip = (Number(page) - 1) * Number(limit);
    const total = await WarrantyClaim.countDocuments(query);
    const claims = await WarrantyClaim.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('equipment', 'name equipmentId')
      .populate('warranty', 'warrantyNumber expiryDate');

    res.json({
      success: true,
      data: claims,
      pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
};

const getWarrantyClaim = async (req, res, next) => {
  try {
    const claim = await WarrantyClaim.findById(req.params.id)
      .populate('equipment', 'name equipmentId')
      .populate('warranty', 'warrantyNumber expiryDate warrantyProvider');
    if (!claim) return res.status(404).json({ success: false, message: 'Claim not found' });
    res.json({ success: true, data: claim });
  } catch (error) {
    next(error);
  }
};

const createWarrantyClaim = async (req, res, next) => {
  try {
    const claim = await WarrantyClaim.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json({ success: true, data: claim });
  } catch (error) {
    next(error);
  }
};

const updateWarrantyClaim = async (req, res, next) => {
  try {
    const claim = await WarrantyClaim.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!claim) return res.status(404).json({ success: false, message: 'Claim not found' });
    res.json({ success: true, data: claim });
  } catch (error) {
    next(error);
  }
};

module.exports = { getWarrantyClaims, getWarrantyClaim, createWarrantyClaim, updateWarrantyClaim };
