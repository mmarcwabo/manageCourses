//Person controller
var Person = require('../models/person');

//validator and sanitizor
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var async = require('async');

//Display list of all people
exports.person_list = function(req, res){
    res.sent('NOT IMPLEMENTED : Person list');
};

//Display detail page for a specific Person
exports.person_detail = function(req, res){
    res.send('NOT IMPLEMENTED : Person detail : ' + req.params.id);
};

// Display Author create form on GET.
exports.person_create_get = function (req, res, next) {
    res.render('person_form', { title: 'Create Person' });
};

// Handle Author create on POST.
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
        
        // Create Author object with escaped and trimmed data
        var person = new Person(
            {
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
                // Successful - redirect to new person record.
                res.redirect(person.url);
            });
        }
    }
];


//Display Person delete on GET
exports.person_delete_get = function (req, res){
    res.send('Person delete GET');
};

//Handle Person delete on POST
exports.person_delete_post = function (req, res){
    res.send('Person delete POST');
};

//Display Person update on GET
exports.person_update_get = function (req, res){
    res.send('Person update GET');
};

//Handle Person update on POST
exports.person_update_post = function (req, res){
    res.send('Person delet POST');
};