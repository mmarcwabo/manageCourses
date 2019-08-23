
const mongoose = require('mongoose');

const Promo = new mongoose.Schema({
    title : String,
});

//virtual for promo url
Promo.virtual('url').
get(function(){
  return '/coursemanager/promo'+this._id;
});

module.exports = mongoose.model('Promo', Promo);