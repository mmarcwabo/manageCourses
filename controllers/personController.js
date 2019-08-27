//Person controller
//Require mongoose
var mongoose = require('mongoose');

//Require models
var Person = require('../models/person');
var Teacher = require('../models/Teacher');
var Student = require('../models/student');

//validator and sanitizor
const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

var async = require('async');

// Display list of all people.
exports.person_list = function (req, res, next) {

    Person.find()
        .sort([['firstName', 'ascending']])
        .exec(function (err, list_people) {
            if (err) { return next(err); }
            // Successful, so render.
            res.render('person_list', { title: 'People List', person_list: list_people });
        })

};

// Display detail page for a specific Person.
exports.person_detail = function (req, res, next) {

    async.parallel({
        person: function (callback) {
            Person.findById(req.params.id)
                .exec(callback)
        },
        
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.person == null) { // No results.
            var err = new Error('Person not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('person_detail', { title: 'Person Detail', person: results.person });
    });

};

// Display person create form on GET.
exports.person_create_get = function (req, res, next) {
    res.render('person_form', { title: 'Create Person' });
};

// Handle person create on POST.
exports.person_create_post = [

    // Validate fields.
    body('firstName').isLength({ min: 1 }).trim().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('lastName').isLength({ min: 1 }).trim().withMessage('Last name must be specified.')
        .isAlphanumeric().withMessage('Last name has non-alphanumeric characters.'),
    body('email').isEmail().trim().withMessage('Email must be specified.'),
    body('age').isLength({ min: 1 }).trim().withMessage('Family name must be specified.')
        .isNumeric().withMessage('Age have to be a valid number.'),
    // Sanitize fields.
    sanitizeBody('*').escape(),
 
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);
        
        // Create person object with escaped and trimmed data
        var person = new Person(
            {
                //Saving refs to other documents works the same way you normally save properties,
                // just assign the _id value:
                _id: new mongoose.Types.ObjectId(),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                age: req.body.age,
                personFunction:req.body.personFunction,
                phone:req.body.phone,
                details:req.body.details
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('person_form', { title: 'Create Person', person: person, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Save person.
            person.save(function (err) {
                if (err) { return next(err); }
                //Save a Person as a Teacher or a Student
                if(req.body.personFunction == 'Student'){

                    var student = new Student({
                        person : person._id, //assign the person id here
                        promo : "Subscription pending"
                    });

                    student.save(function(err){
                        if(err){return handleError(err)};
                    });

                }else{
                    var teacher = new Teacher({
                        person : person._id, //assign the person id here
                        courses : ["Courses to be add"]
                    });

                    teacher.save(function(err){
                        if(err){return handleError(err)};
                    });
                }


                // Successful - redirect to new person record.
                res.redirect(person.url);
            });
        }
    }
];


// Display Person delete form on GET.
exports.person_delete_get = function (req, res, next) {

    async.parallel({
        person: function (callback) {
            Person.findById(req.params.id).exec(callback)
        }
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.person == null) { // No results.
            res.redirect('/coursemanager/people');
        }
        // Successful, so render.
        res.render('person_delete', { title: 'Delete Person', person: results.person });
    });

};

//Handle Person delete on POST
exports.person_delete_post = function (req, res, next) {

    async.parallel({
        person: function (callback) {
            Person.findById(req.body.personid).exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); }
        // Success.
        // Delete object and redirect to the list of people.
        Person.findByIdAndRemove(req.body.personid, function deletePerson(err) {
                if (err) { return next(err); }
                // Success - go to person list.
                res.redirect('/coursemanager/people')
            })
    });

};

//Display Person update on GET
exports.person_update_get = function (req, res, next) {

    Person.findById(req.params.id, function (err, person) {
        if (err) { return next(err); }
        if (person == null) { // No results.
            var err = new Error('Person not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('person_form', { title: 'Update Person', person: person });

    });
};

//Handle Person update on POST
exports.person_update_post = [

    // Validate fields.
    body('firstName').isLength({ min: 1 }).trim().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('lastName').isLength({ min: 1 }).trim().withMessage('Last name must be specified.')
        .isAlphanumeric().withMessage('Last name has non-alphanumeric characters.'),
    body('email').isEmail().trim().withMessage('Email must be specified.'),
    body('age').isLength({ min: 1 }).trim().withMessage('Family name must be specified.')
        .isNumeric().withMessage('Age have to be a valid number.'),
    // Sanitize fields.
    sanitizeBody('*').escape(),
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create Person object with escaped and trimmed data (and the old id!)
        var person = new Person(
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                age: req.body.age,
                personFunction:req.body.personFunction,
                phone:req.body.phone,
                details:req.body.details,
                _id: req.params.id
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('person_form', { title: 'Update Person', person: person, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Person.findByIdAndUpdate(req.params.id, person, {}, function (err, theperson) {
                if (err) { return next(err); }
                // Successful - redirect to genre detail page.
                res.redirect(theperson.url);
            });
        }
    }
];