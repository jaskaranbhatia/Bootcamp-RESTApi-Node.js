const express = require('express');

// Include other resource routers
const courseRouter = require('./course');

const router = express.Router();

// Courses based on BootcampId
// Re-route into other resource routers
router.use('/:bootcampId/course', courseRouter);

const { getBootcamps, createBootcamp, getBootcamp, updateBootcamp, deleteBootcamp, getBootcampById } = require('../controllers/bootcamps')

const { protect } = require('../middleware/auth')

router.route('/').get(getBootcamps)
router.route('/:id').get(getBootcamp)
router.route('/user/:id').get(getBootcampById)
router.route('/:id').put(protect, updateBootcamp)
router.route('/:id').delete(protect, deleteBootcamp)
router.route('/create_bootcamp').post(protect,createBootcamp)

module.exports = router;