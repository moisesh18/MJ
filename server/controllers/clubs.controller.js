const Club = require('../models/club');
const Student = require('../models/student');
const ClubController = {};
const mongoose = require('mongoose');

ClubController.get = async (req,res)=>{
    const clubs = await Club.find();
    res.json(clubs);
}

ClubController.create = async (req,res) => {
    const director = new Club(req.body);
    await director.save();
    res.json({
        status: 'Saved'
    });
};

ClubController.getClub = async (req,res)=>{
    await Club.find(function (err,club){
        res.json(club);
    });
}

ClubController.getDirectors = async (req,res)=>{
    const plural = await mongoose.model('Director').find({club:req.params.id})
                            .populate({path: 'student'});
    res.json(plural);
}

ClubController.getEnrolls = async (req,res)=>{
    console.log(req.params.id);
    const plural = await mongoose.model('Enroll').find({club:req.params.id});
    res.json(plural);
    console.log("hola");
}

ClubController.edit = async (req,res)=>{
    const { id } = req.params;
    const club = {    
        name: req.body.name,
        logo: req.body.logo,
        fees: req.body.fees
    }
    await Club.findByIdAndUpdate(id, {$set: club},{new:true});
    res.json({
        status: 'Updated'
    });
}

ClubController.delete = async (req,res)=>{
    await Club.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Removed'
    });
}

module.exports = ClubController;