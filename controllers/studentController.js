//student controller
var Student = require('../models/student');

//Display list of all people
exports.student_list = function(req, res){
    res.sent('NOT IMPLEMENTED : student list');
};

//Display detail page for a specific student
exports.student_detail = function(req, res){
    res.send('NOT IMPLEMENTED : student detail : ' + req.params.id);
};

//Display student create form on GET
exports.student_create_get = function(req, res){
    res.send('student create GET');
};

//Handle student create on POST
exports.student_create_post = function (req, res){
    res.send('student create POST');
};

//Display student delete on GET
exports.student_delete_get = function (req, res){
    res.send('student delete GET');
};

//Handle student delete on POST
exports.student_delete_post = function (req, res){
    res.send('student delete POST');
};

//Display student update on GET
exports.student_update_get = function (req, res){
    res.send('student update GET');
};

//Handle student update on POST
exports.student_update_post = function (req, res){
    res.send('student delet POST');
};