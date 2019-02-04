const Club = require('../models/club');
const Student = require('../models/student');
const ClubController = {};
const mongoose = require('mongoose');
let single = {};

ClubController.get = async (req, res) => {
    if (req.user.role == "admin") {
        single = await Club.find();
    } else {
        single = await Club.find({ _id: req.user.club });
    }
    res.json(single);
}

ClubController.create = async (req, res) => {
    try {
        single = new Club(req.body);
        if (Validations(single)) {
            await single.save();
            res.json({ message: "Completado" })
        }
    } catch (e) {
        res.json({ message: e.message })
    }
};

ClubController.getClub = async (req, res) => {
    await Club.find(function (err, club) {
        res.json(club);
    });
}

ClubController.getDirectors = async (req, res) => {
    const plural = await mongoose.model('Director').find({ club: req.params.id })
        .populate({ path: 'student' });
    res.json(plural);
}

ClubController.getEnrolls = async (req, res) => {
    if (req.user.role == "admin") {
        single = await Student.find();
        single.forEach(function (s, i) { single[i] = { student: s } });
    } else {
        single = await mongoose.model('Enroll').find({ club: req.user.club })
            .populate({ path: 'student' });
    }
    res.json(single);
}

ClubController.edit = async (req, res) => {
    try {
        single = new Club(req.body);
        await Club.findByIdAndUpdate(single._id, { $set: single }, { new: true });
        res.json({ message: "Completado" })
    } catch (e) {
        res.json({ message: e.message })
    }
}

ClubController.delete = async (req, res) => {
    try {
        await Club.findByIdAndRemove(req.params.id);
        res.json({ message: "Completado" })
    } catch (e) {
        res.json({ message: e.message })
    }
}

function Validations(obj) {
    for (var o in obj) {
        if (obj[o] == "" || !obj[o]) throw new Error("Revisa los campos");
    }
    return true;
}

module.exports = ClubController;