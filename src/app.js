const express = require('express');
const app = express();
const cors = require('cors');
const studentRoutes = require('./routes/student');
const teacherRoutes = require('./routes/teacher');
const groupRoutes = require('./routes/group');
const assetRouter =  require('./routes/asset');
const annotationRouter = require('./routes/annotation');
const courseRoutes = require('./routes/course');
const enviromentRouter = require('./routes/enviroment');   
const quizRouter = require('./routes/quiz');
const quizElementRouter = require('./routes/quizElement');
const quizElementAnswerRouter = require('./routes/quizElementAnswer');
const quizResultRouter = require('./routes/quizResult');
const sessionRouter = require('./routes/session');

app.use(express.json());
app.use(cors());


app.use('/teachers', teacherRoutes);
app.use('/students',studentRoutes);
app.use('/groups',groupRoutes);
app.use('/assets',assetRouter);
app.use('/annotations',annotationRouter);
app.use('/courses',courseRoutes);
app.use('/enviroments',enviromentRouter);
app.use('/quiz',quizRouter);
app.use('/quizElements',quizElementRouter);
app.use('/quizElementAnswers',quizElementAnswerRouter);
app.use('/quizResults',quizResultRouter);
app.use('/sessions',sessionRouter);

module.exports = app;