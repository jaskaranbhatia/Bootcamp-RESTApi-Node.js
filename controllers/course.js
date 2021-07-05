const Course = require('../models/Course')
const Bootcamp = require('../models/Bootcamp')
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../util/errorResponse')

exports.createCourse = asyncHandler(async (req, res, next) => {
    // Add user to req.body
    if(!req.params.bootcampId){
        return res.status(201).json({
            success: false,
            error: "Bootcamp Id not available"
        });
    }
    req.body.bootcamp = await Bootcamp.findById(req.params.bootcampId);
    const course = await Course.create(req.body);
    res.status(201).json({
        success: true,
        data: course
    });
});

exports.getCourses = asyncHandler(async (req,res, next) => {
    let query;
    if(req.params.bootcampId){
        query = Course.find({bootcamp: req.params.bootcampId});
    }
    else{
        query = Course.find().populate({
            path: 'bootcamp',
            select: 'name description'
        });
    }
    const courses = await query;
    res.status(200).json({
        success : true, 
        count : courses.length,
        data: courses
    });
});