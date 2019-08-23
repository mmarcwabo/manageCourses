//Promo controller
var Promo = require('../models/promo');

//Display list of all people
exports.promo_list = function(req, res){
    res.sent('NOT IMPLEMENTED : promo list');
};

//Display detail page for a specific promo
exports.promo_detail = function(req, res){
    res.send('NOT IMPLEMENTED : promo detail : ' + req.params.id);
};

//Display promo create form on GET
exports.promo_create_get = function(req, res){
    res.send('promo create GET');
};

//Handle promo create on POST
exports.promo_create_post = function (req, res){
    res.send('promo create POST');
};

//Display promo delete on GET
exports.promo_delete_get = function (req, res){
    res.send('promo delete GET');
};

//Handle promo delete on POST
exports.promo_delete_post = function (req, res){
    res.send('promo delete POST');
};

//Display promo update on GET
exports.promo_update_get = function (req, res){
    res.send('promo update GET');
};

//Handle promo update on POST
exports.promo_update_post = function (req, res){
    res.send('promo delet POST');
};