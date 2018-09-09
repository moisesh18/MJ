const mongoose = require('mongoose');
const {Schema} = mongoose;

const DirectorsSchema =  new Schema({
    job: {type:String, required:true},
    student : { type: String, ref: 'Student' },
    club : { type: Schema.ObjectId, ref: 'Clubs' },
});

module.exports = mongoose.model('Director', DirectorsSchema);