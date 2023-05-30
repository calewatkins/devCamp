const express = require("express");
const router = express.Router();
const bootcamp = require('./bootcamp');
const courses = require('./courses');

router.route('/bootcamps').get(bootcamp);
router.route('/courses').get(courses);

module.exports = router;