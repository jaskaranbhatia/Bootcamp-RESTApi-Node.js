const express = require('express');
const router = express.Router({ mergeParams: true});

const { createCourse, getCourses } = require('../controllers/course')

router.route('/').get(getCourses);
router.route('/create_course').post(createCourse)

module.exports = router;