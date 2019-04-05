const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const ClubsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    fees: {
        type: Number,
        required: true
    },
});

ClubsSchema.virtual('money').get(async function () {
    return this.getMoney(function (err, dogs) {
        console.log(dogs); // woof
    });
});


ClubsSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Clubs', ClubsSchema);
