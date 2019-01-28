const Cycle = require('../models/cycle');
const CycleController = {};
const mongoose = require('mongoose');

CycleController.get = async (req,res)=>{
    const cycle = await Cycle.find();
    res.json(cycle);
}

CycleController.create = async (req,res) => {
    const cycle = new Cycle(req.body);
    if (Validations(req.body)) {
      await cycle.save(function (err) {
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

function Validations(obj) {
  for (var o in obj) {
    if (obj[o] == "" || !obj[o]) return false;
  }
  return true;
}

CycleController.getCycle = async (req,res)=>{
    await Cycle.find(function (err,cycle){
        res.json(cycle);
    });
}

CycleController.getEnrolls = async (req,res)=>{
    const plural = await mongoose.model('Enrolled').find({club:req.params.id})
                            .populate({path: 'student',select:"first_name last_name"})
                            .populate({path: 'club',select:"name"});
    res.json(plural);
}

CycleController.edit = async (req,res)=>{
    const { id } = req.params;
    const cycle = {
        cycle: req.body.cycle,
        fees: req.body.fees
    }
    await Cycle.findByIdAndUpdate(id, {$set: cycle},{new:true});
    res.json({
        status: 'Updated'
    });
}

CycleController.delete = async (req,res)=>{
    await Cycle.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Removed'
    });
}

module.exports = CycleController;