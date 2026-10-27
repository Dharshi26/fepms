const Warranty = require('../models/Warranty');

const getWarranties = async (req, res, next) => {
  try {
    const { equipment, status, page = 1, limit = 10 } = req.query;
    const query = {};
    if (equipment) query.equipment = equipment;

    const skip = (Number(page) - 1) * Number(limit);
    let warranties = await Warranty.find(query)
      .sort({ expiryDate: 1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('equipment', 'name equipmentId')
      .populate('createdBy', 'name');

    const total = await Warranty.countDocuments(query);

    // Filter by virtual status if requested
    if (status) {
      warranties = warranties.filter((w) => w.warrantyStatus === status);
    }

    res.json({
      success: true,
      data: warranties,
      pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
};

const getWarranty = async (req, res, next) => {
  try {
    const warranty = await Warranty.findById(req.params.id).populate('equipment', 'name equipmentId');
    if (!warranty) return res.status(404).json({ success: false, message: 'Warranty not found' });
    res.json({ success: true, data: warranty });
  } catch (error) {
    next(error);
  }
};

const createWarranty = async (req, res, next) => {
  try {
    const warranty = await Warranty.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json({ success: true, data: warranty });
  } catch (error) {
    next(error);
  }
};

const updateWarranty = async (req, res, next) => {
  try {
    const warranty = await Warranty.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!warranty) return res.status(404).json({ success: false, message: 'Warranty not found' });
    res.json({ success: true, data: warranty });
  } catch (error) {
    next(error);
  }
};

const deleteWarranty = async (req, res, next) => {
  try {
    const warranty = await Warranty.findByIdAndDelete(req.params.id);
    if (!warranty) return res.status(404).json({ success: false, message: 'Warranty not found' });
    res.json({ success: true, message: 'Warranty deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getWarranties, getWarranty, createWarranty, updateWarranty, deleteWarranty };
