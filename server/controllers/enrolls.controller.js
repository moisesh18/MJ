const Enroll = require('../models/enroll');
const EnrollController = {};
const mongoose = require('mongoose');
let single = {};

EnrollController.get = async (req, res) => {
    if (req.user.role == "admin" || req.user.role == "tesorero") {
        single = await Enroll.find()
            .populate({
                path: 'student' 
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
                path: 'student'
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
        res.json({ message: e.message })
    }
};

EnrollController.edit = async (req, res) => {
    
    if (req.params.club._id != req.user.club._id) {
        res.json({ message: "No puedes editar un inscrito que no es de tu club" })};
    try {
        
        single = new Enroll(req.body);
        await Enroll.findByIdAndUpdate(single._id, { $set: single }, { new: true });
        res.json({ success: true, message: "Completado" })
    } catch (e) {
        res.json({ message: e.message })
    }
}

EnrollController.delete = async (req, res) => {
    try {
        await Enroll.findByIdAndRemove(req.params.id);
        res.json({ success: true, message: "Completado" })
    } catch (e) {
        res.json({ message: e.message })
    }
}

module.exports = EnrollController;
