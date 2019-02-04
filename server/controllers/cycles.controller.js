const Cycle = require('../models/cycle');
const CycleController = {};
const mongoose = require('mongoose');
let single = {};
CycleController.get = async (req, res) => {
    const cycle = await Cycle.find();
    res.json(cycle);
}

CycleController.create = async (req, res) => {
    try {
        single = new Cycle(req.body);
        if (Validations(single)) {
            await single.save();
            res.json({ message: "Completado" })
        }
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
        res.json({ message: "Completado" })
    } catch (e) {
        res.json({ message: e.message })
    }
}

CycleController.delete = async (req, res) => {
    try {
        await Cycle.findByIdAndRemove(req.params.id);
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

module.exports = CycleController;