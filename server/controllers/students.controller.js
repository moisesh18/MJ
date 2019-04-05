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
        res.json({ message: e.message })
    }
}

StudentController.createStudent = async (req, res) => {
    try {
        single = new Student(req.body)
        single._id = (single._id != null) ? single._id : camelize(single.first_name + " " + single.last_name)
        await single.save();
        res.json({ success: true, message: "Completado" })
    } catch (e) {
        res.json({ message: e.message })
    }
};

function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
        return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
}

StudentController.editStudent = async (req, res) => {
    try {
        single = new Student(req.body);
        await Student.findByIdAndUpdate(single._id, { $set: single }, { new: true });
        res.json({ success: true, message: "Completado" })
    } catch (e) {
        res.json({ message: e.message })
    }
}

StudentController.deleteStudent = async (req, res) => {
    try {
        console.log(req.params.id)
        await Enroll.find({ student: req.params.id }).remove;
        await Student.findByIdAndRemove(req.params.id);
        res.json({ success: true, message: "Completado" })
    } catch (e) {
        res.json({ message: e.message })
    }
}

module.exports = StudentController;