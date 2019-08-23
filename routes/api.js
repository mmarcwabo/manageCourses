//All routes 
var express = require('express');
var router = express.Router();

//Require controller modules
var course_controller = require('../controllers/courseController');
var person_controller = require('../controllers/personController');
var promo_controller = require('../controllers/promoController');
var student_controller = require('../controllers/studentController');
var teacher_controller = require('../controllers/teacherController');

//Course routes
//GET app home page
router.get('/', course_controller.index);

//GET request for creating a course
router.get('/course/create',course_controller.course_create_get);

//POST request for creating a course
router.post('/course/create', course_controller.course_create_post);

//GET request to delete course
router.get('/course/:id/delete', course_controller.course_delete_get);

//POST request to delete course
router.post('/course/:id/delete', course_controller.course_delete_post);

//GET request to update course
router.get('/course/:id/update', course_controller.course_update_get);

//POST request to update course
router.post('/course/:id/update', course_controller.course_update_post);

//GET Request for one course
router.get('/course/:id', course_controller.course_detail);

//GET Request for all the courses list
router.get('/courses', course_controller.course_list);

module.exports = router;