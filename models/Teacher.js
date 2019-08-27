
var mongoose = require('mongoose');

var Teacher = new mongoose.Schema({
    person : { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
    courses : [String]
});
module.exports = mongoose.model('Teacher', Teacher);