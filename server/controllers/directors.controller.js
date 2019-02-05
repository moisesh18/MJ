const Director = require('../models/director');
const DirectorController = {};
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var secret = "&$^Vb:?wKYL'N'6%";
const bcrypt = require('bcrypt-nodejs');
let single = {}

DirectorController.getDirectors = async (req, res) => {
    if (req.user.role == "admin") {
        single = await Director.find()
            .populate({
                path: 'student',
                select: "first_name last_name"
            })
            .populate({
                path: 'club',
                select: 'name'
            });
    } else {
        single = await Director.find({ club: req.user.club })
            .populate({
                path: 'student',
                select: "first_name last_name"
            })
            .populate({
                path: 'club',
                select: 'name'
            });
    }
    res.json(single);
}

DirectorController.createDirector = async (req, res) => {
    try {
        single = new Director(req.body);
        if (Validations(req.body)) {
            await single.save();
            res.json({ success: true, message: "Completado" })
        }
    } catch (e) {
        res.json({ message: e.message })
    }
};

DirectorController.currentUser = async (req, res) => {
    res.json(req.user);
};

DirectorController.authenticate = async (req, res) => {
    try {
        var user = await Director.findOne({ student: req.body.username })
        if (req.body.password && user.comparePasswords(req.body.password)) {
            var encryptedUser = {
                username: user.student,
                club: user.club,
                role: user.role
            }
            var token = jwt.sign(encryptedUser, secret, {
                expiresIn: '24h'
            });
            res.json({
                success: true,
                message: "Login correcto",
                token: token,
                user: encryptedUser
            });
        } else {
            res.json({
                success: false,
                message: "Contraseña incorrecta"
            });
        }
    } catch (e) {
        res.json({ message: e.message })
    }
}

DirectorController.getDirector = async (req, res) => {
    try {
        single = await Director.findOne({ student: req.params.id });
        res.json(single);
    } catch (e) {
        res.json({ message: e.message })
    }
}
//$2a$10$eIFKiU.aulBmFqrhIFWfQOAsmas1m2edLSkK1RU2vkbxoyhKV4IMG
//test

DirectorController.editDirector = async (req, res) => {
    try {
        single = new Director(req.body);
        if (single.password != undefined) {
            await bcrypt.hash(single.password, null, null, function (err, hash) {
                if (err) return next(err);
                single.password = hash;
            });
        } else {
            delete single.password;
        }
        await Director.findByIdAndUpdate(single._id, { $set: single }, { runValidators: false });
        res.json({ success: true, message: "Completado" })
    } catch (e) {
        res.json({ message: e.message })
    }
}

DirectorController.deleteDirector = async (req, res) => {
    try {
        await Director.findByIdAndRemove(req.params.id);
        res.json({ success: true, message: "Completado" })
    } catch (e) {
        res.json({ message: e.message })
    }
}

function Validations(obj) {
    for (var o in obj) {
        if (obj[o] == "" || !obj[o]) return false;
    }
    return true;
}

module.exports = DirectorController;
