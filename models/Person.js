//Person model

const mongoose = require('mongoose');

const Person = new mongoose.Schema({
  firstName : {type:String, required: true, max: 100},
  lastName : {type:String, required: true, max: 100},
  email : String,
  age : Number,
  phone : String,
  personFunction: {type: String, required: true, default: 'Student'},
  details : String
  
});
//virtual for person full name
Person
.virtual('name').get(function(){
  return this.firstName+' '+this.lastName;
});
//virtual for person url
Person.virtual('url').
get(function(){
  return '/coursemanager/person/'+this._id;
});

module.exports = mongoose.model('Person', Person);
