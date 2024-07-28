const express = require('express');
const app = express();
const cors = require('cors');
const Student = require("./models/student");
const studentRoutes = require('./routes/student');


app.use(express.json());
app.use(cors());


app.use('/students',studentRoutes);
  


module.exports = app;