//Course controller
var Course = require('../models/course');
var Promo = require('../models/promo');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var async = require('async');

//Get the home page
exports.index = function(req, res) {

    async.parallel({
        course_count: function(callback) {
            Course.count(callback);
        }
        /*,
        book_instance_count: function(callback) {
            BookInstance.count(callback);
        },
        book_instance_available_count: function(callback) {
            BookInstance.count({status:'Available'},callback);
        },
        author_count: function(callback) {
            Author.count(callback);
        },
        genre_count: function(callback) {
            Genre.count(callback);
        },*/
    }, function(err, results) {
        res.render('index', { title: 'Course Home', error: err, data: results });
    });
};

//Display list of all courses

exports.course_list = function(req, res, next) {

  Course.find({}, 'courseTitle promo ')
    .populate('promo')
    .exec(function (err, list_courses) {
      if (err) { return next(err); }
      // Successful, so render
      res.render('course_list', { title: 'Course List', course_list:  list_courses});
    });

};

// Display detail page for a specific course.
exports.course_detail = function(req, res, next) {

    async.parallel({
        course: function(callback) {

            Course.findById(req.params.id)
              .populate('teacher')
              .populate('promo')
              .exec(callback);
        }
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.course==null) { // No results.
            var err = new Error('Course not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('course_detail', { title: 'Title', course:  results.course} );
    });

};

//Display course create form on GET
exports.course_create_get = function(req, res){
    res.status(200).send('course_form', {title : "Create a Course"});
};

//Handle course create on POST
exports.course_create_post = function (req, res){
    res.send('course create POST');
};

//Display course delete on GET
exports.course_delete_get = function (req, res){
    res.send('course delete GET');
};

//Handle course delete on POST
exports.course_delete_post = function (req, res){
    res.send('course delete POST');
};

//Display course update on GET
exports.course_update_get = function (req, res){
    res.send('course update GET');
};

//Handle course update on POST
exports.course_update_post = function (req, res){
    res.send('course delet POST');
};