const Student = require('../models/student');
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
        single = new Student(req.body);
        if (Validations(single)) {
            await single.save();
            res.json({ message: "Completado" })
        }
    } catch (e) {
        res.json({ message: e.message })
    }
};

StudentController.editStudent = async (req, res) => {
    try {
        single = new Student(req.body);
        await Student.findByIdAndUpdate(single._id, { $set: single }, { new: true });
        res.json({ message: "Completado" })
    } catch (e) {
        res.json({ message: e.message })
    }
}

StudentController.deleteStudent = async (req, res) => {
    try {
        await Student.findByIdAndRemove(req.params.id);
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

module.exports = StudentController;