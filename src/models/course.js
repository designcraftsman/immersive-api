const pool = require("../database/db");

class Course {
    constructor(idEnvironnement, idTeacher, name, creationDate, creationTime, description, maxVisitors, code , image) {
        this.idEnvironnement = idEnvironnement;
        this.idTeacher = idTeacher;
        this.name = name;
        this.creationDate = creationDate;
        this.creationTime = creationTime;
        this.description = description;
        this.maxVisitors = maxVisitors;
        this.code = code;
        this.image = image;
    }

    async addCourse() {
        try {
            await pool.query(
                "INSERT INTO course (idenvironnement, idteacher, name, creationdate, creationtime, description, maxvisitors, code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
                [this.idEnvironnement, this.idTeacher, this.name, this.creationDate, this.creationTime, this.description, this.maxVisitors, this.code]
            );
            console.log("Course added");
        } catch (error) {
            throw new Error("Error adding course");
        }
    }

    static async deleteCourse(id) {
        try {
            await pool.query("DELETE FROM course WHERE idcourse = $1", [id]);
        } catch (error) {
            throw new Error("Error deleting course");
        }
    }

    static async getCourse(id) {
        try {
            const response = await pool.query("SELECT * FROM course WHERE idcourse = $1", [id]);
            return response.rows[0];
        } catch (error) {
            throw new Error("Error getting course");
        }
    }

    static async getAll() {
        try {
            const response = await pool.query("SELECT * FROM course");
            return response.rows;
        } catch (error) {
            throw new Error("Error getting courses");
        }
    }

    async updateCourse(id) {
        try {
            const fields = {};
            if (this.idEnvironnement !== undefined) fields.idenvironnement = this.idEnvironnement;
            if (this.idTeacher !== undefined) fields.idteacher = this.idTeacher;
            if (this.name !== undefined) fields.name = this.name;
            if (this.creationDate !== undefined) fields.creationdate = this.creationDate;
            if (this.creationTime !== undefined) fields.creationtime = this.creationTime;
            if (this.description !== undefined) fields.description = this.description;
            if (this.maxVisitors !== undefined) fields.maxvisitors = this.maxVisitors;
            if (this.code !== undefined) fields.code = this.code;

            if (Object.keys(fields).length === 0) {
                throw new Error("No fields provided for update.");
            }

            const keys = Object.keys(fields);
            const values = Object.values(fields);
            const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
            values.push(id); // Add id to values

            const queryText = `UPDATE course SET ${setClause} WHERE idcourse = $${values.length} RETURNING *`;
            const result = await pool.query(queryText, values);

            if (result.rowCount === 0) {
                throw new Error("Course not found.");
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error updating course:', error.message);
            throw new Error("Error updating course");
        }
    }
}

module.exports = Course;
