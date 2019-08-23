//Person controller
var Person = require('../models/person');

//Display list of all people
exports.person_list = function(req, res){
    res.sent('NOT IMPLEMENTED : Person list');
};

//Display detail page for a specific Person
exports.person_detail = function(req, res){
    res.send('NOT IMPLEMENTED : Person detail : ' + req.params.id);
};

//Display Person create form on GET
exports.person_create_get = function(req, res){
    res.send('Person create GET');
};

//Handle Person create on POST
exports.person_create_post = function (req, res){
    res.send('Person create POST');
};

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