const Student = require('../models/student');
const StudentController = {};

StudentController.getStudents = async (req,res)=>{
    const students = await Student.find();
    res.json(students);
}

StudentController.createStudent = async (req,res) => {
    const student = new Student(req.body);
    if (Validations(req.body)) {
        await student.save(function (err) {
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

StudentController.getStudent = async (req,res)=>{
    const student = await Student.findById(req.params.id);
    res.json(student);
}

StudentController.editStudent = async (req,res)=>{
    const { id } = req.params;
    const student = {    
        _id: req.body._id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        career: req.body.career,
        career_year: req.body.career_year,
        birthday: req.body.birthday,
        email: req.body.email,
        phone: req.body.phone,
        shirt_size: req.body.shirt_size,
        resident: req.body.resident,
        residence: req.body.residence,
        breakfast: req.body.breakfast,
        lunch: req.body.lunch,
        dinner: req.body.dinner,
        blood_type: req.body.blood_type,
        drugs: req.body.drugs,
        allergy: req.body.allergy,
        recent_illness: req.body.recent_illness,
    }
    await Student.findByIdAndUpdate(id, {$set: student},{new:true});
    res.json({
        status: 'Updated'
    });
}

StudentController.deleteStudent = async (req,res)=>{
    await Student.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Removed'
    });
}

module.exports = StudentController;