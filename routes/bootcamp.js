const express = require("express");
const router = express.Router();
const { getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamp, getBootcampsInRadius } = require("../controllers/bootcampsController");

//include other resource routers
const courseRouter = require('./courses');

//re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router
  .route('/radius/:zipcode/:distance')
  .get(getBootcampsInRadius);

router
  .route('/bootcamps')
  .get(getBootcamps)
  .post(createBootcamp);

router
  .route('/bootcamps/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);


module.exports = router;