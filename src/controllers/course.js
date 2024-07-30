const Course = require('../models/course');

exports.addCourse = async (req, res) => {
    try {
        const { idEnvironnement, idTeacher, name, creationDate, creationTime, description, maxVisitors, code } = req.body;
        const course = new Course(idEnvironnement, idTeacher, name, creationDate, creationTime, description, maxVisitors, code);
        await course.addCourse();
        res.status(201).json({ message: "Course added successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.getCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.getCourse(id);
        res.status(201).json({ message: "Course found successfully", course });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.getAll();
        res.status(201).json({ message: "Courses found successfully", courses });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        await Course.deleteCourse(id);
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { idEnvironnement, idTeacher, name, creationDate, creationTime, description, maxVisitors, code } = req.body;
        const course = new Course(idEnvironnement, idTeacher, name, creationDate, creationTime, description, maxVisitors, code);
        const response = await course.updateCourse(id);
        res.status(200).json({ message: "Course updated successfully", response });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};
