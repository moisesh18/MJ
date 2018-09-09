const mongoose = require('mongoose');
const {Schema} = mongoose;

const CycleSchema =  new Schema({
    name: {type:String, required:true},
    fees: {type:Number, required:true},
});

module.exports = mongoose.model('Cycle', CycleSchema);