const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentsSchema = new Schema({
    _id: { type: String },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    career: { type: String },
    career_year: { type: Number },
    birthday: { type: String },
    email: { type: String },
    phone: { type: String },
    shirt_size: { type: String },
    resident: { type: Boolean },
    residence: { type: String },
    breakfast: { type: Boolean },
    lunch: { type: Boolean },
    dinner: { type: Boolean },
    blood_type: { type: String },
    drugs: { type: String },
    allergy: { type: String },
    recent_illness: { type: String },
    baptized: { type: Boolean },
    religion: { type: String },
    mexican: { type: Boolean },
    emergency_phone: { type: String }
}, { _id: false });

StudentsSchema.virtual('fullName').get(function () {
    return this.first_name + ' ' + this.last_name;
});

StudentsSchema.virtual('student').get(function () {
    return this._id + ' - ' + this.first_name + ' ' + this.last_name;
});

StudentsSchema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('Student', StudentsSchema);