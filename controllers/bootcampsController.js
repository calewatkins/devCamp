const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');


// @desc get all the bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();

  res
    .status(201)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});

// @desc get one of the bootcamps
// @route GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if(!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
  } else {
      res
        .status(201)
        .json({ success: true, data: bootcamp });
  }
});

// @desc create a new bootcamp
// @route Post /api/v1/bootcamps
// @access Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  res
    .status(201)
    .json({ success: true, data: bootcamp });
});

// @desc update one of the bootcamps
// @route Put /api/v1/bootcamps/:id
// @access Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if(!bootcamp) {
    res
      .status(400)
      .json({ success: false, data: "Could not update." });
  } else {
      res
        .status(200)
        .json({ success: true, body: bootcamp });
  }
});

// @desc delete a bootcamp
// @route delete /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if(!bootcamp) {
    res
      .status(400)
      .json({ success: false, body: "Could not delete" });
  } else {
      res
        .status(200)
        .json({ success: true, body: {} });
  }
});