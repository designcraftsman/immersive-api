const express = require('express');
const router = express.Router();
const QuizCtrl = require('../controllers/Quiz');
const auth = require('../middleware/auth');

router.post('/add', auth ,QuizCtrl.addQuiz);
router.delete('/delete/:id', auth, QuizCtrl.deleteQuiz);
router.get('/get/:id', auth, QuizCtrl.getQuiz);
router.get('/', auth, QuizCtrl.getAllQuizzes);
router.put('/update/:id', auth, QuizCtrl.updateQuiz);

module.exports = router;