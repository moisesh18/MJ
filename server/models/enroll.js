const mongoose = require('mongoose');
const {Schema} = mongoose;

const EnrollsSchema =  new Schema({
    student : { type: String, ref: 'Student' },
    club : {type: Schema.ObjectId, ref: 'Clubs' },
    fees: {type:Number},
    cycle : { type: Schema.ObjectId, ref: 'Cycle' },
});

module.exports = mongoose.model('Enroll', EnrollsSchema);