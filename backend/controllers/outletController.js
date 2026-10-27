const Outlet = require('../models/Outlet');
const Franchise = require('../models/Franchise');
const { validationResult } = require('express-validator');

// @desc   Get all outlets (with search, filter, pagination)
// @route  GET /api/outlets
// @access Admin, Manager
const getOutlets = async (req, res, next) => {
  try {
    const { search, status, franchise, page = 1, limit = 10 } = req.query;
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

    if (franchise) {
      query.franchise = franchise;
    }

    // Managers can only see their assigned franchises and outlets
    if (req.user.role === 'manager') {
      if (req.user.assignedFranchises && req.user.assignedFranchises.length > 0) {
        query.franchise = { $in: req.user.assignedFranchises };
      } else {
        // Manager with no franchises sees no outlets
        query.franchise = { $in: [] };
      }

      if (req.user.assignedOutlets && req.user.assignedOutlets.length > 0) {
        // If filter by franchise is set, combine both
        if (franchise) {
          query._id = { $in: req.user.assignedOutlets };
        } else {
          query._id = { $in: req.user.assignedOutlets };
        }
      }
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Outlet.countDocuments(query);
    const outlets = await Outlet.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('franchise', 'name code')
      .populate('createdBy', 'name email role');

    res.json({
      success: true,
      data: outlets,
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

// @desc   Get single outlet
// @route  GET /api/outlets/:id
// @access Admin, Manager
const getOutlet = async (req, res, next) => {
  try {
    const outlet = await Outlet.findById(req.params.id)
      .populate('franchise', 'name code')
      .populate('createdBy', 'name email role');

    if (!outlet) {
      return res.status(404).json({ success: false, message: 'Outlet not found' });
    }

    // Manager scope check
    if (req.user.role === 'manager') {
      const hasAccessToFranchise =
        req.user.assignedFranchises &&
        req.user.assignedFranchises.map(String).includes(String(outlet.franchise._id));

      const hasAccessToOutlet =
        req.user.assignedOutlets && req.user.assignedOutlets.map(String).includes(String(outlet._id));

      if (!hasAccessToFranchise && !hasAccessToOutlet) {
        return res.status(403).json({ success: false, message: 'Not authorized to access this outlet' });
      }
    }

    res.json({ success: true, data: outlet });
  } catch (error) {
    next(error);
  }
};

// @desc   Create outlet
// @route  POST /api/outlets
// @access Admin, Manager
const createOutlet = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    // Verify franchise exists
    const franchise = await Franchise.findById(req.body.franchise);
    if (!franchise) {
      return res.status(404).json({ success: false, message: 'Franchise not found' });
    }

    // Manager scope check
    if (
      req.user.role === 'manager' &&
      (!req.user.assignedFranchises ||
        !req.user.assignedFranchises.map(String).includes(String(franchise._id)))
    ) {
      return res
        .status(403)
        .json({ success: false, message: 'Not authorized to create outlets in this franchise' });
    }

    // Check for duplicate code within franchise
    const existing = await Outlet.findOne({
      franchise: req.body.franchise,
      code: req.body.code.toUpperCase(),
    });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'Outlet code already exists within this franchise',
      });
    }

    const outletData = {
      ...req.body,
      createdBy: req.user._id,
    };

    const outlet = await Outlet.create(outletData);
    await outlet.populate('franchise', 'name code');
    await outlet.populate('createdBy', 'name email role');

    res.status(201).json({
      success: true,
      data: outlet,
      message: 'Outlet created successfully',
    });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error (compound index)
      return res.status(409).json({
        success: false,
        message: 'Outlet code already exists within this franchise',
      });
    }
    next(error);
  }
};

// @desc   Update outlet
// @route  PUT /api/outlets/:id
// @access Admin, Manager
const updateOutlet = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const outlet = await Outlet.findById(req.params.id);
    if (!outlet) {
      return res.status(404).json({ success: false, message: 'Outlet not found' });
    }

    // Manager scope check
    if (
      req.user.role === 'manager' &&
      (!req.user.assignedFranchises ||
        !req.user.assignedFranchises.map(String).includes(String(outlet.franchise)))
    ) {
      return res
        .status(403)
        .json({ success: false, message: 'Not authorized to update this outlet' });
    }

    // Validate franchise if being changed
    if (req.body.franchise && String(req.body.franchise) !== String(outlet.franchise)) {
      const newFranchise = await Franchise.findById(req.body.franchise);
      if (!newFranchise) {
        return res.status(404).json({ success: false, message: 'New franchise not found' });
      }
    }

    // Check for duplicate code if code is being changed
    if (req.body.code && req.body.code.toUpperCase() !== outlet.code) {
      const franchiseId = req.body.franchise || outlet.franchise;
      const existing = await Outlet.findOne({
        franchise: franchiseId,
        code: req.body.code.toUpperCase(),
      });
      if (existing) {
        return res.status(409).json({
          success: false,
          message: 'Outlet code already exists within this franchise',
        });
      }
    }

    const updatedOutlet = await Outlet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('franchise', 'name code')
      .populate('createdBy', 'name email role');

    res.json({
      success: true,
      data: updatedOutlet,
      message: 'Outlet updated successfully',
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Outlet code already exists within this franchise',
      });
    }
    next(error);
  }
};

// @desc   Delete (deactivate) outlet
// @route  DELETE /api/outlets/:id
// @access Admin, Manager (only franchise admins can delete within franchise)
const deleteOutlet = async (req, res, next) => {
  try {
    const outlet = await Outlet.findById(req.params.id);
    if (!outlet) {
      return res.status(404).json({ success: false, message: 'Outlet not found' });
    }

    // Manager scope check
    if (
      req.user.role === 'manager' &&
      (!req.user.assignedFranchises ||
        !req.user.assignedFranchises.map(String).includes(String(outlet.franchise)))
    ) {
      return res
        .status(403)
        .json({ success: false, message: 'Not authorized to delete this outlet' });
    }

    if (outlet.status === 'inactive') {
      return res.status(400).json({
        success: false,
        message: 'Outlet is already inactive',
      });
    }

    const updated = await Outlet.findByIdAndUpdate(req.params.id, { status: 'inactive' }, {
      new: true,
    })
      .populate('franchise', 'name code')
      .populate('createdBy', 'name email role');

    res.json({
      success: true,
      data: updated,
      message: 'Outlet deactivated successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOutlets,
  getOutlet,
  createOutlet,
  updateOutlet,
  deleteOutlet,
};
