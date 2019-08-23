
var mongoose = require('mongoose');

var Teacher = new mongoose.Schema({
    person : { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
    courses : [{type: mongoose.Schema.Types.ObjectId, ref:'Course'}]
});
module.exports = mongoose.model('Teacher', Teacher);