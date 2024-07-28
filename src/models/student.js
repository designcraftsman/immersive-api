const pool = require("../database/db");
class Student {
    constructor(firstName, lastName, dateOfBirth, email, password) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.dateOfBirth = dateOfBirth;
      this.email = email;
      this.password = password;
    }
  
    // Method to save the student to the database
    async save() {
      try {
        const newStudent = await pool.query(
          "INSERT INTO student (firstname, lastname, birthdate, email, password) VALUES ($1, $2, $3, $4, $5)",
          [this.firstName, this.lastName, this.dateOfBirth, this.email, this.password]
        );
        return newStudent.rows[0];
      } catch (error) {
        throw new Error("Error saving student");
      }
    }
  
    // Static method to get all students
    static async getAll() {
      try {
        const result = await pool.query("SELECT * FROM student");
        return result.rows;
      } catch (error) {
        throw new Error("Error retrieving students");
      }
    }
  
    // Static method to find a student by ID
    static async findById(id) {
      try {
        const result = await pool.query("SELECT * FROM student WHERE idstudent = $1", [id]);
        return result.rows[0];
      } catch (error) {
        throw new Error("Error finding student");
      }
    }
    static async update(id, fields) {
        try {
          const keys = Object.keys(fields);
          const values = Object.values(fields);
          const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
          values.push(id);
    
          const updatedStudent = await pool.query(
            `UPDATE student SET ${setClause} WHERE idstudent = $${values.length} RETURNING *`,
            values
          );
          return updatedStudent.rows[0];
        } catch (error) {
          throw new Error("Error updating student");
        }
      }
    
      // Delete student from the database
      static async delete(id) {
        try {
          await pool.query("DELETE FROM student WHERE idstudent = $1", [id]);
        } catch (error) {
          throw new Error("Error deleting student");
        }
      }
  }


  
  module.exports = Student;
  