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
          const newTeacher = await pool.query(
            "INSERT INTO teacher (firstname, lastname, birthdate, email, password, specialisation) VALUES ($1, $2, $3, $4, $5, $6)",
            [this.firstName, this.lastName, this.dateOfBirth, this.email, this.password, this.specialization]
          );
          console.log("Teacher added successfully!");
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
      
          const token = jwt.sign({ id: teacher.id}, 'TOKEN_SECRET', { expiresIn: '4h' });
          console.log(token);
          return { token, id:  teacher.id  };
        } catch (error) {
          console.error("Login failed:", error);
          if (error.message === "Teacher not found" || error.message === "Invalid password") {
            throw error;
          }
          throw new Error("Login failed");
        }
      }
      
      
    
}

module.exports = Teacher;