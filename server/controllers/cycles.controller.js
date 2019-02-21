const Cycle = require('../models/cycle');
const CycleController = {};
const mongoose = require('mongoose');
let single = {};

CycleController.get = async (req, res) => {
    single = await Cycle.find().sort({ "_id": 'desc' })
    //.limit(1)
    res.json(single);
}

CycleController.create = async (req, res) => {
    try {
        single = new Cycle(req.body);
        await single.save();
        res.json({ success: true, message: "Completado" })
    } catch (e) {
        res.json({ message: e.message })
    }
};

CycleController.getCycle = async (req, res) => {
    try {
        single = await Cycle.find();
        res.json(single);
    } catch (e) {
        res.json({ message: e.message })
    }

}

CycleController.getEnrolls = async (req, res) => {
    const plural = await mongoose.model('Enrolled').find({ club: req.params.id })
        .populate({ path: 'student', select: "first_name last_name" })
        .populate({ path: 'club', select: "name" });
    res.json(plural);
}

CycleController.edit = async (req, res) => {
    try {
        single = new Cycle(req.body);
        await Cycle.findByIdAndUpdate(single._id, { $set: single }, { new: true });
        res.json({ success: true, message: "Completado" })
    } catch (e) {
        res.json({ message: e.message })
    }
}

CycleController.delete = async (req, res) => {
    try {
        await Cycle.findByIdAndRemove(req.params.id);
        res.json({ success: true, message: "Completado" })
    } catch (e) {
        res.json({ message: e.message })
    }
}

module.exports = CycleController;