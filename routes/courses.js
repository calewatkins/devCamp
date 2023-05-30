const express = require("express");
const router = express.Router({ mergeParams: true });
const { getCourses } = require("../controllers/coursesController");


router.use('/courses', getCourses);


module.exports = router;