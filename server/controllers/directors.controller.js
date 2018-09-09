const Director = require('../models/director');
const DirectorController = {};
const mongoose = require('mongoose');

DirectorController.getDirectors = async (req,res)=>{
    const directors = await Director.find()
                            .populate({path: 'student',select:"first_name last_name"})
                            .populate({path: 'club',select: 'name'});
    res.json(directors);
}

DirectorController.createDirector = async (req,res) => {
    const director = new Director(req.body);
    await director.save();
    res.json({
        status: 'Saved'
    });
};

DirectorController.getDirector = async (req,res)=>{
    await Director.find({student:req.params.id}, function (err,students){
        res.json(students);
    });
}

DirectorController.editDirector = async (req,res)=>{
    const { id } = req.params;
    const director = {    
        job: req.body.job,
        student: req.body.student,
        club: req.body.club
    }
    await Director.findByIdAndUpdate(id, {$set: director},{new:true});
    res.json({
        status: 'Updated'
    });
}

DirectorController.deleteDirector = async (req,res)=>{
    await Director.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Removed'
    });
}

module.exports = DirectorController;