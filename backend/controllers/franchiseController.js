const Franchise = require('../models/Franchise');
const { validationResult } = require('express-validator');

// @desc   Get all franchises (with search, filter, pagination)
// @route  GET /api/franchises
// @access Admin, Manager
const getFranchises = async (req, res, next) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) {
      if (!['active', 'inactive'].includes(status)) {
        return res.status(400).json({ success: false, message: 'Invalid status value' });
      }
      query.status = status;
    }

    // Managers can only see their assigned franchises
    if (req.user.role === 'manager') {
      if (req.user.assignedFranchises && req.user.assignedFranchises.length > 0) {
        query._id = { $in: req.user.assignedFranchises };
      } else {
        // Manager with no franchises assigned sees none
        query._id = { $in: [] };
      }
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Franchise.countDocuments(query);
    const franchises = await Franchise.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('createdBy', 'name email role');

    res.json({
      success: true,
      data: franchises,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Get single franchise
// @route  GET /api/franchises/:id
// @access Admin, Manager
const getFranchise = async (req, res, next) => {
  try {
    const franchise = await Franchise.findById(req.params.id).populate('createdBy', 'name email role');
    if (!franchise) {
      return res.status(404).json({ success: false, message: 'Franchise not found' });
    }

    // Manager scope check
    if (
      req.user.role === 'manager' &&
      (!req.user.assignedFranchises ||
        !req.user.assignedFranchises.map(String).includes(String(franchise._id)))
    ) {
      return res.status(403).json({ success: false, message: 'Not authorized to access this franchise' });
    }

    res.json({ success: true, data: franchise });
  } catch (error) {
    next(error);
  }
};

// @desc   Create franchise
// @route  POST /api/franchises
// @access Admin
const createFranchise = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    // Check for duplicate code
    const existing = await Franchise.findOne({ code: req.body.code.toUpperCase() });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Franchise code already exists' });
    }

    const franchiseData = {
      ...req.body,
      createdBy: req.user._id,
    };

    const franchise = await Franchise.create(franchiseData);

    res.status(201).json({
      success: true,
      data: franchise,
      message: 'Franchise created successfully',
    });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({
        success: false,
        message: `Franchise ${field} already exists`,
      });
    }
    next(error);
  }
};

// @desc   Update franchise
// @route  PUT /api/franchises/:id
// @access Admin
const updateFranchise = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const franchise = await Franchise.findById(req.params.id);
    if (!franchise) {
      return res.status(404).json({ success: false, message: 'Franchise not found' });
    }

    // Check for duplicate code if code is being changed
    if (req.body.code && req.body.code.toUpperCase() !== franchise.code) {
      const existing = await Franchise.findOne({ code: req.body.code.toUpperCase() });
      if (existing) {
        return res.status(409).json({ success: false, message: 'Franchise code already exists' });
      }
    }

    const updatedFranchise = await Franchise.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: updatedFranchise,
      message: 'Franchise updated successfully',
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({
        success: false,
        message: `Franchise ${field} already exists`,
      });
    }
    next(error);
  }
};

// @desc   Delete (deactivate) franchise
// @route  DELETE /api/franchises/:id
// @access Admin
const deleteFranchise = async (req, res, next) => {
  try {
    const franchise = await Franchise.findById(req.params.id);
    if (!franchise) {
      return res.status(404).json({ success: false, message: 'Franchise not found' });
    }

    if (franchise.status === 'inactive') {
      return res.status(400).json({
        success: false,
        message: 'Franchise is already inactive',
      });
    }

    const updated = await Franchise.findByIdAndUpdate(
      req.params.id,
      { status: 'inactive' },
      { new: true }
    );

    res.json({
      success: true,
      data: updated,
      message: 'Franchise deactivated successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFranchises,
  getFranchise,
  createFranchise,
  updateFranchise,
  deleteFranchise,
};
