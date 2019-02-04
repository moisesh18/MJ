const mongoose = require('mongoose');
const {
    Schema
} = mongoose;
const bcrypt = require('bcrypt-nodejs');

const DirectorsSchema = new Schema({
    role: {
        type: String,
        required: true
    },
    student: {
        type: String,
        ref: 'Student',
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    club: {
        type: Schema.ObjectId,
        ref: 'Clubs'
    },
});


DirectorsSchema.pre('save', function (next) {
    var director = this;
    bcrypt.hash(director.password, null, null, function (err, hash) {
        if (err) return next(err);
        director.password = hash;
        next();
    });
});


DirectorsSchema.methods.comparePasswords = function (password) {
    return bcrypt.compareSync(password, this.password);
}



module.exports = mongoose.model('Director', DirectorsSchema);
