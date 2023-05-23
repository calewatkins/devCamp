const express = require("express");
const router = express.Router();
const { getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamp } = require("../controllers/bootcampsController");

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