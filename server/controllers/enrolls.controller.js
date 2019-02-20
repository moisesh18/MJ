const Enroll = require('../models/enroll');
const EnrollController = {};
const mongoose = require('mongoose');
let single = {};

EnrollController.get = async (req, res) => {
    if (req.user.role == "admin") {
        single = await Enroll.find()
            .populate({
                path: 'student',
                select: "first_name last_name"
            })
            .populate({
                path: 'club',
                select: 'name'
            })
            .populate({
                path: 'cycle',
                select: 'name'
            });
    } else {
        single = await Enroll.find({ club: req.user.club })
            .populate({
                path: 'student',
                select: "first_name last_name"
            })
            .populate({
                path: 'club',
                select: 'name'
            })
            .populate({
                path: 'cycle',
                select: 'name'
            });
    }
    res.json(single);
}

EnrollController.create = async (req, res) => {
    try {
        single = new Enroll(req.body);
        await single.save();
        res.json({ success: true, message: "Completado" })
    } catch (e) {
        res.json({ message: e})
    }
};

EnrollController.edit = async (req, res) => {
    try {
        single = new Enroll(req.body);
        await Enroll.findByIdAndUpdate(single._id, { $set: single }, { new: true });
        res.json({ success: true, message: "Completado" })
    } catch (e) {
        res.json({ message: e})
    }
}

EnrollController.delete = async (req, res) => {
    try {
        await Enroll.findByIdAndRemove(req.params.id);
        res.json({ success: true, message: "Completado" })
    } catch (e) {
        res.json({ message: e})
    }
}

module.exports = EnrollController;
