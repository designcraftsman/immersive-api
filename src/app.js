const express = require('express');
const app = express();
const cors = require('cors');
const studentRoutes = require('./routes/student');
const teacherRoutes = require('./routes/teacher');
const groupRoutes = require('./routes/group');


app.use(express.json());
app.use(cors());


app.use('/teachers', teacherRoutes);
app.use('/students',studentRoutes);
app.use('/groups',groupRoutes);


module.exports = app;