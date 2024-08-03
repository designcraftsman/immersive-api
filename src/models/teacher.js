const pool = require("../database/db");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

class Teacher{
    constructor(firstName, lastName, dateOfBirth, email, password , specialization) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.dateOfBirth = dateOfBirth;
      this.email = email;
      this.password = password;
      this.specialization = specialization;
    }

    async register() {
        try {
          const verifyEmail = await pool.query("SELECT * FROM teacher WHERE email = $1", [this.email]);
          if(verifyEmail.rows.length > 0) {
            throw new Error("Email already exists");
          }else{
           await pool.query(
            "INSERT INTO teacher (firstname, lastname, birthdate, email, password, specialisation) VALUES ($1, $2, $3, $4, $5, $6)",
            [this.firstName, this.lastName, this.dateOfBirth, this.email, this.password, this.specialization]
          );
          console.log("Teacher added successfully!");
        }
        } catch (error) {
          throw new Error("Error saving teacher");
        }
      }

      static async login(email, password) {
        try {
          const result = await pool.query("SELECT * FROM teacher WHERE email = $1", [email]);
      
          const teacher = result.rows[0];
          if (!teacher) {
            console.error("Teacher not found");
            throw new Error("Teacher not found");
          }
      
          const isValidPassword = await bcrypt.compare(password, teacher.password);
          if (!isValidPassword) {
            console.error("Invalid password");
            throw new Error("Invalid password");
          }
      
          const token = jwt.sign({ id: teacher.idteacher}, 'TOKEN_SECRET', { expiresIn: '4h' });
  
          return { token: token, id:  teacher.idteacher , success: true };
        } catch (error) {
          console.error("Login failed:", error);
          if (error.message === "Teacher not found" || error.message === "Invalid password") {
            throw error;
          }
          throw new Error("Login failed");
        }
      }

      static async get(id){
        try{
        const teacher = await pool.query("SELECT * FROM teacher where idteacher = $1",[id]);
        return teacher.rows[0];
        }catch(error){
          throw new Error("Error finding teacher");
        }
      }

}

module.exports = Teacher;