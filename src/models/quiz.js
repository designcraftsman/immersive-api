const pool = require("../database/db");
class Quiz {
    constructor(idCourse, idTeacher) {
        this.idCourse = idCourse;
        this.idTeacher = idTeacher;
    }

    async addQuiz() {
        try {
            await pool.query(
                "INSERT INTO quiz (idCourse, idTeacher) VALUES ($1, $2)",
                [this.idCourse, this.idTeacher]
            );
            console.log("Quiz added");
        } catch (error) {
            throw new Error("Error adding quiz");
        }
    }

    static async deleteQuiz(id) {
        try {
            await pool.query("DELETE FROM quiz WHERE idquiz = $1", [id]);
        } catch (error) {
            throw new Error("Error deleting quiz");
        }
    }

    static async getQuiz(id) {
        try {
            const response = await pool.query("SELECT * FROM quiz WHERE idquiz = $1", [id]);
            return response.rows[0];
        } catch (error) {
            throw new Error("Error getting quiz");
        }
    }

    static async getAll() {
        try {
            const response = await pool.query("SELECT * FROM quiz");
            return response.rows;
        } catch (error) {
            throw new Error("Error getting quizzes");
        }
    }

    async updateQuiz(id) {
        try {
            const fields = {};
            if (this.idCourse !== undefined) fields.idCourse = this.idCourse;
            if (this.idTeacher !== undefined) fields.idTeacher = this.idTeacher;

            if (Object.keys(fields).length === 0) {
                throw new Error("No fields provided for update.");
            }

            const keys = Object.keys(fields);
            const values = Object.values(fields);
            const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
            values.push(id); // Add id to values

            const queryText = `UPDATE quiz SET ${setClause} WHERE idquiz = $${values.length} RETURNING *`;
            const result = await pool.query(queryText, values);

            if (result.rowCount === 0) {
                throw new Error("Quiz not found.");
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error updating quiz:', error.message);
            throw new Error("Error updating quiz");
        }
    }
}
module.exports = Quiz;