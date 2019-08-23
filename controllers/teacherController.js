//teacher controller
var teacher = require('../models/teacher');

//Display list of all people
exports.teacher_list = function(req, res){
    res.sent('NOT IMPLEMENTED : teacher list');
};

//Display detail page for a specific teacher
exports.teacher_detail = function(req, res){
    res.send('NOT IMPLEMENTED : teacher detail : ' + req.params.id);
};

//Display teacher create form on GET
exports.teacher_create_get = function(req, res){
    res.send('teacher create GET');
};

//Handle teacher create on POST
exports.teacher_create_post = function (req, res){
    res.send('teacher create POST');
};

//Display teacher delete on GET
exports.teacher_delete_get = function (req, res){
    res.send('teacher delete GET');
};

//Handle teacher delete on POST
exports.teacher_delete_post = function (req, res){
    res.send('teacher delete POST');
};

//Display teacher update on GET
exports.teacher_update_get = function (req, res){
    res.send('teacher update GET');
};

//Handle teacher update on POST
exports.teacher_update_post = function (req, res){
    res.send('teacher delet POST');
};