const Student = require("../models/student");

exports.addStudent = async (req, res) => {
    try {
      const { firstName, lastName, birthDate, email, password } = req.body;
      const student = new Student(firstName, lastName, birthDate, email, password);
      const newStudent = await student.save();
      res.status(201).json({ 
        message: "Student added successfully", 
        success: true,
         student: newStudent
         });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
         error: "An error occurred",
         success: false
         });
    }
};

exports.getAllStudents = async (req, res) => {
    try {
      const students = await Student.getAll();
      res.status(201).json({ message: "Students found successfully", students });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "An error occurred" });
    }
  };

  exports.getStudent = async (req, res) => {
    try {
      const { id } = req.params;
      const student = await Student.findById(id);
      res.json(student);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "An error occurred" });
    }
  };


  exports.updateStudent = async (req, res) => {
    try {
      const { id } = req.params;
      const fields = req.body;
      const updatedStudent = await Student.update(id, fields);
      res.status(200).json({ message: "Student updated successfully", student: updatedStudent });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "An error occurred" });
    }
  };
  
  exports.deleteStudent = async (req, res) => {
    try {
      const { id } = req.params;
      await Student.delete(id);
      res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "An error occurred" });
    }
  };
  