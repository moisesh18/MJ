const mongoose = require('mongoose');
const { Schema } = mongoose;

const EnrollsSchema = new Schema({
    student: { type: String, ref: 'Student', required: true },
    club: { type: Schema.ObjectId, ref: 'Clubs', required: true },
    fees: { type: Number, required: true },
    cycle: { type: Schema.ObjectId, ref: 'Cycle', required: true },
});

module.exports = mongoose.model('Enroll', EnrollsSchema);