const Club = require('../models/club');
const Student = require('../models/student');
const ClubController = {};
const mongoose = require('mongoose');

ClubController.get = async (req, res) => {
    const clubs = await Club.find();
    res.json(clubs);
}

ClubController.create = async (req, res) => {
    const club = new Club(req.body);
    if (Validations(req.body)) {
        await club.save(function (err) {
            if (err) {
                res.send("El club ya existe...");
            } else {
                res.json({
                    status: 'Saved'
                });
            }
        });
    } else {
        res.send("Revisa los campos...");
    }
};

function Validations(obj) {
    for (var o in obj) {
        if (obj[o] == "" || !obj[o]) return false;
    }
    return true;
}

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
    const plural = await mongoose.model('Enroll').find({ club: req.params.id })
        .populate({ path: 'student' });
    res.json(plural);
}

ClubController.edit = async (req, res) => {
    const { id } = req.params;
    const club = {
        name: req.body.name,
        logo: req.body.logo,
        fees: req.body.fees,
        type: req.body.type
    }
    await Club.findByIdAndUpdate(id, { $set: club }, { new: true });
    res.json({
        status: 'Updated'
    });
}

ClubController.delete = async (req, res) => {
    await Club.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Removed'
    });
}

module.exports = ClubController;