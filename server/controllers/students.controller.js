const Student = require('../models/student');
const Enroll = require('../models/enroll');
const StudentController = {};
let single = {};
StudentController.getStudents = async (req, res) => {
    single = await Student.find();
    res.json(single);
}

StudentController.getStudent = async (req, res) => {
    try {
        single = await Student.findById(req.params.id);
        res.json(single);
    } catch (e) {
        res.json({ message: e})
    }
}

StudentController.createStudent = async (req, res) => {
    try {
        single = new Student(req.body);
        single._id = (single._id === undefined) ? single._id : single.first_name.replace(/\s/g, "").toLowerCase() + single.last_name.toLowerCase()
        await single.save();
        res.json({ success: true, message: "Completado" })
    } catch (e) {
        res.json({ message: e})
    }
};

StudentController.editStudent = async (req, res) => {
    try {
        single = new Student(req.body);
        await Student.findByIdAndUpdate(single._id, { $set: single }, { new: true });
        res.json({ success: true, message: "Completado" })
    } catch (e) {
        res.json({ message: e})
    }
}

StudentController.deleteStudent = async (req, res) => {
    try {
        await Enroll.find({ student: req.params.id }).remove;
        await Student.findByIdAndRemove(req.params.id);
        res.json({ success: true, message: "Completado" })
    } catch (e) {
        res.json({ message: e})
    }
}

module.exports = StudentController;