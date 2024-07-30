const QuizElementAnswer = require('../models/quizelementanswer');

exports.addQuizElementAnswer = async (req, res) => {
    try {
        const { idQuizElement, idQuizResult, choix } = req.body;
        const quizElementAnswer = new QuizElementAnswer(idQuizElement, idQuizResult, choix);
        await quizElementAnswer.addQuizElementAnswer();
        res.status(201).json({ message: "QuizElementAnswer added successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.getQuizElementAnswer = async (req, res) => {
    try {
        const { id } = req.params;
        const quizElementAnswer = await QuizElementAnswer.getQuizElementAnswer(id);
        res.status(201).json({ message: "QuizElementAnswer found successfully",});
    }catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.getAllQuizElementAnswers = async (req, res) => {
    try {
        const quizElementAnswers = await QuizElementAnswer.getAll();
        res.status(201).json({ message: "QuizElementAnswers found successfully", quizElementAnswers });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.deleteQuizElementAnswer = async (req, res) => {
    try {
        const { id } = req.params;
        await QuizElementAnswer.deleteQuizElementAnswer(id);
        res.status(200).json({ message: "QuizElementAnswer deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.updateQuizElementAnswer = async (req, res) => {
    try {
        const { id } = req.params;
        const { idQuizElement, idQuizResult, choix } = req.body;
        const quizElementAnswer = new QuizElementAnswer(idQuizElement, idQuizResult, choix);
        const response = await quizElementAnswer.updateQuizElementAnswer(id);
        res.status(200).json({ message: "QuizElementAnswer updated successfully", response });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};
