//Course controller
var Course = require('../models/course');
var Teacher = require('../models/Teacher');
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

// Handle course create on POST.
exports.course_create_post = [
    // Convert the genre to an array.
    //

    // Validate fields.
    body('courseTitle', 'Title must not be empty.').isLength({ min: 1 }).trim(),
    body('teacher', 'Teacher must not be empty.').isLength({ min: 1 }).trim(),
    body('promo', 'Promo must not be empty.').isLength({ min: 1 }).trim(),
    body('volume', 'volume must not be empty').isLength({ min: 1 }).trim(),
  
    // Sanitize fields.
    sanitizeBody('*').escape(),
    // Process request after validation and sanitization.
    (req, res, next) => {
        

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Book object with escaped and trimmed data.
        var book = new Book(
          { courseTitle: req.body.courseTitle,
            teacher: req.body.teacher,
            promo: req.body.promo,
            volume: req.body.volume,
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all authors and genres for form.
            async.parallel({
                teachers: function(callback) {
                    Teacher.find(callback);
                },
                promos: function(callback) {
                    Promo.find(callback);
                },
            }, function(err, results) {
                if (err) { return next(err); }

                res.render('course_form', { title: 'Add a Course',authors:results.teachers, promos:results.promos, course: course, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Save book.
            course.save(function (err) {
                if (err) { return next(err); }
                   // Successful - redirect to new book record.
                   res.redirect(course.url);
                });
        }
    }
];

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