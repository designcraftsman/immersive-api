const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./database/db");

app.use(express.json());
app.use(cors());



app.post("/addStudent", async(req,res)=>{
    try{
        const {description} = req.body;
        const firstName = "Oussama";
        const lastName = "Fayz";
        const birthDate = "01-02-2002";
        const email = req.body;
        const password = "0000";
        const newStudent = await pool.query(
            "INSERT INTO student (firstName, lastName, birthdate, email, password)VALUES ($1, $2, $3, $4, $5)"
            ,[firstName,lastName,birthDate,email,password]
        );
    }catch(error){
        console.error(error.message);
    }
});


app.get("/getAllStudents", async(req,res)=>{
    try{
       const allStudents = await pool.query("SELECT * FROM student");
       res.json(allStudents.rows);
    }catch(error){
        console.error(error.message);
    }
});

app.get("/getStudent/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const Student = await pool.query("SELECT * FROM student WHERE idstudent = $1"
            ,[id]
        );
        res.json(Student.rows[0]);
    }catch(error){
        console.error(error.message);
    }
});

app.put("/updateStudent/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const {firstname} = req.body;
        const updatedStudent = await pool.query("UPDATE student SET firstname=$1 WHERE idstudent=$2 RETURNING *",[firstname,id]);
        console.log("Student updated successfully");
    }catch(error){
        console.error(error.message);
    }
});

app.delete("/deleteStudent/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const deletedStudent = await pool.query("DELETE FROM student WHERE idstudent=$1",[id]);
        console.log("Student deleted successfully");
    }catch(error){
        console.error(error.message);
    }
});


module.exports = app;