const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');


// @desc get all the bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  //console.log(req);
  let { select, sort, page, limit, ...query } = { ...req.query };

  query = JSON.parse(
      JSON.stringify(query).replace(/\b(gt|lt|gte|lte|ne|in)\b/g, (match) => `$${match}`)
  );
  
  select = select && select.replaceAll(',', ' ');
  console.log(select);
  sort = sort ? sort.replace(/,/g, ' ') : '-createdAt';
  
  //pagination
  page = parseInt(req.query.page, 10) || 1;
  limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments();
  console.log(`startIndex: ${startIndex}, endIndex: ${endIndex}, total: ${total}`);

  const bootcamps = await Bootcamp
                      .find(query, select)
                      .sort(sort)
                      .limit(limit)
                      .skip(startIndex);

  //pagination result
  const pagination = {};
  if(endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    }
  }

  if(startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    }
  }

  res
    .status(201)
    .json({ success: true, count: bootcamps.length, pagination, data: bootcamps });
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

// @desc Get bootcamps within a radius
// @route GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  //get lat and lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  //calculate the radius using radians
  //divide distance by radius of earth
  //Earth Radius = 3,963 miles
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: {
      $geoWithin: { $centerSphere: [ [ lng, lat ], radius ]}
    }
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
  });

});