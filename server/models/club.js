const mongoose = require('mongoose');
const {Schema} = mongoose;

const ClubsSchema =  new Schema({
    name: {type:String, required:true},
    logo: {type:String, required:true},
    fees: {type:Number, required:true},
});

module.exports = mongoose.model('Clubs', ClubsSchema);