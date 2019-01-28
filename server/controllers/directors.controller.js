const Director = require('../models/director');
const DirectorController = {};
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var secret = "&$^Vb:?wKYL'N'6%";
const bcrypt = require('bcrypt-nodejs');

DirectorController.getDirectors = async (req, res) => {
    const directors = await Director.find()
        .populate({
            path: 'student',
            select: "first_name last_name"
        })
        .populate({
            path: 'club',
            select: 'name'
        });
    res.json(directors);
}

DirectorController.createDirector = async (req, res) => {
    const director = new Director(req.body);
    if (Validations(req.body)) {
        await director.save(function (err) {
            if (err) {
                res.send("El usuario ya existe...");
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

DirectorController.currentUser = async (req, res) => {
    res.send(req.decoded);
};

DirectorController.authenticate = async (req, res) => {
    await Director.findOne({
        student: req.body.username
    }).exec(function (err, user) {
        if (!user) {
            res.json({
                success: false,
                message: "El usuario no existe"
            });
        } else if (user) {
            if (req.body.password && user.comparePasswords(req.body.password)) {
                var token = jwt.sign({
                    username: user.student,
                    club: user.club
                }, secret, {
                        expiresIn: '24h'
                    });
                res.json({
                    success: true,
                    message: "Login correcto",
                    token: token
                });
            } else {
                res.json({
                    success: false,
                    message: "Contraseña incorrecta"
                });
            }
        }
    });
}

DirectorController.getDirector = async (req, res) => {
    await Director.findOne({
        student: req.params.id
    }, function (err, students) {
        res.json(students);
    });
}


DirectorController.prueba = async (req, res) => {
    var director = {
        password: null
    }
    //$2a$10$eIFKiU.aulBmFqrhIFWfQOAsmas1m2edLSkK1RU2vkbxoyhKV4IMG
    //test
    await bcrypt.hash("moises", null, null, function (err, hash) {
        if (err) return next(err);
        director.password = hash;
    });
    await Director.findByIdAndUpdate("5bf1e3b45bf70e8bab9c5646", { $set: director }, { runValidators: true });
    res.json({
        status: 'Updated'
    });
}


DirectorController.editDirector = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    var director = {
        job: req.body.job,
        password: null,
        student: req.body.student,
        club: req.body.club
    }
    if (req.body.password != undefined) {
        console.log("SI HAY ALGO |" + req.body.password + "| TF");
        await bcrypt.hash(req.body.password, null, null, function (err, hash) {
            if (err) return next(err);
            director.password = hash;
            console.log(director.password);
        });
    } else {
        console.log("SI NO HAY NADA");
        delete director.password;
    }
    await Director.findByIdAndUpdate(id, { $set: director }, { runValidators: false });
    res.json({
        status: 'Updated'
    });
}

DirectorController.deleteDirector = async (req, res) => {
    await Director.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Removed'
    });
}

module.exports = DirectorController;

function Validations(obj) {
    for (var o in obj) {
        if (obj[o] == "" || !obj[o]) return false;
    }
    return true;
}
