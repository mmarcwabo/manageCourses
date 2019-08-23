
const mongoose = require('mongoose');

const Student = new mongoose.Schema({
    person : { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
    promo : { type: mongoose.Schema.Types.ObjectId, ref: 'Promo' }
});

module.exports = mongoose.model('Student', Student);