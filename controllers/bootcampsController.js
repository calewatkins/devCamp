// @desc get all the bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({success: true, message: "Show all bootcamps"});
};

// @desc get one of the bootcamps
// @route GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({success: true, message: `Show bootcamp ${req.params.id}`});
};

// @desc create a new bootcamp
// @route Post /api/v1/bootcamps
// @access Private
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({success: true, message: "Create new bootcamps"});
};

// @desc update one of the bootcamps
// @route Put /api/v1/bootcamps/:id
// @access Private
exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({success: true, message: `Update bootcamp ${req.params.id}`});
};

// @desc delete a bootcamp
// @route delete /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({success: true, message: `Delete bootcamp ${req.params.id}`});
};