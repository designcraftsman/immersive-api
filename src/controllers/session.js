const Session = require('../models/session');

exports.addSession = async (req, res) => {
    try {
        const { idUser, idCourse, timeSpent, sessionStartTime, sessionEndTime } = req.body;
        const session = new Session(idUser, idCourse, timeSpent, sessionStartTime, sessionEndTime);
        await session.addSession();
        res.status(201).json({ message: "Session added successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.getSession = async (req, res) => {
    try {
        const { id } = req.params;
        const session = await Session.getSession(id);
        res.status(201).json({ message: "Session found successfully", session });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.getAllSessions = async (req, res) => {
    try {
        const sessions = await Session.getAll();
        res.status(201).json({ message: "Sessions found successfully", sessions });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.deleteSession = async (req, res) => {
    try {
        const { id } = req.params;
        await Session.deleteSession(id);
        res.status(200).json({ message: "Session deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.updateSession = async (req, res) => {
    try {
        const { id } = req.params;
        const { idUser, idCourse, timeSpent, sessionStartTime, sessionEndTime } = req.body;
        const session = new Session(idUser, idCourse, timeSpent, sessionStartTime, sessionEndTime);
        const response = await session.updateSession(id);
        res.status(200).json({ message: "Session updated successfully", response });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};
