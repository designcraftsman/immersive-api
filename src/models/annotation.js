
const pool = require("../database/db");

class Annotation {
    constructor(idModel, name, description, position) {
        this.idModel = idModel;
        this.name = name;
        this.description = description;
        this.position = JSON.stringify(position);
    }

    async addAnnotation() {
        try {
            await pool.query(
                "INSERT INTO annotation (idModel, name, description, position) VALUES ($1, $2, $3, $4)",
                [this.idModel, this.name, this.description, this.position]
            );
            console.log("Annotation added");
        } catch (error) {
            throw new Error("Error adding annotation");
        }
    }

    static async deleteAnnotation(id) {
        try {
            await pool.query("DELETE FROM annotation WHERE idannotation = $1", [id]);
        } catch (error) {
            throw new Error("Error deleting annotation");
        }
    }

    static async getAnnotation(id) {
        try {
            const response = await pool.query("SELECT * FROM annotation WHERE idannotation = $1", [id]);
            return response.rows[0];
        } catch (error) {
            throw new Error("Error getting annotation");
        }
    }

    static async getAll() {
        try {
            const response = await pool.query("SELECT * FROM annotation");
            return response.rows;
        } catch (error) {
            throw new Error("Error getting annotations");
        }
    }

    async updateAnnotation(id) {
        try {
            const fields = {};
            if (this.idModel !== undefined) fields.idModel = this.idModel;
            if (this.name !== undefined) fields.name = this.name;
            if (this.description !== undefined) fields.description = this.description;
            if (this.position !== undefined) fields.position = this.position;

            if (Object.keys(fields).length === 0) {
                throw new Error("No fields provided for update.");
            }

            const keys = Object.keys(fields);
            const values = Object.values(fields);
            const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
            values.push(id); // Add id to values

            const queryText = `UPDATE annotation SET ${setClause} WHERE idannotation = $${values.length} RETURNING *`;
            const result = await pool.query(queryText, values);

            if (result.rowCount === 0) {
                throw new Error("Annotation not found.");
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error updating annotation:', error.message);
            throw new Error("Error updating annotation");
        }
    }
}

module.exports = Annotation;