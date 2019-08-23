//Course model

const mongoose = require('mongoose');

const Course = new mongoose.Schema({
  courseTitle : {type:String},
  teacher : { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher'},
  promo : { type: mongoose.Schema.Types.ObjectId, ref: 'Promo' },
  volume : Number
});

//virtual for course url
Course.virtual('url').
get(function(){
  return '/coursemanager/course'+this._id;
});
module.exports = mongoose.model('Course', Course);
