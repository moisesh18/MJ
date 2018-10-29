const Enroll = require('../models/enroll');
const EnrollController = {};
const mongoose = require('mongoose');

EnrollController.get = async (req, res) => {
  const single = await Enroll.find()
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
  res.json(single);
}

EnrollController.create = async (req, res) => {
  const single = new Enroll(req.body);
  await single.save();
  res.json({
    status: 'Saved'
  });
};

EnrollController.edit = async (req, res) => {
  const {
    id
  } = req.params;
  const single = {
    student: req.body.student,
    club: req.body.club,
    fees: req.body.fees,
    cycle: req.body.cycle
  }
  Enroll.findByIdAndUpdate(id, {
    $set: single
  }, {
    new: true
  });
  res.json({
    status: 'Updated'
  });
}

EnrollController.delete = async (req, res) => {
  await Enroll.findByIdAndRemove(req.params.id);
  res.json({
    status: 'Removed'
  });
}

module.exports = EnrollController;
