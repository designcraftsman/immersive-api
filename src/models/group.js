const pool = require("../database/db");

class Group{
    constructor(idTeacher ,name, description, students) {
       this.idTeacher = idTeacher;
       this.name = name;
       this.description = description;
       this.students = JSON.stringify(students);
    }

    async addGroup() {
        try {
          await pool.query(
            "INSERT INTO groupe (idteacher ,name, description , students) VALUES ($1, $2, $3 ,$4)",
            [this.idTeacher, this.name, this.description , this.students]
          );
          console.log("Group added");
        } catch (error) {
          throw new Error("Error adding group");
        }
      }

    static async deleteGroup(id){
        try{
            await pool.query("DELETE FROM groupe WHERE idgroupe = $1", [id]);
        }catch(error){
            throw new Error("Error deleting group");
        }
      }

    static async getGroup(id){
        try{
            const response = await pool.query("SELECT * FROM groupe WHERE idgroupe = $1", [id]);
            return response.rows[0];
        }catch(error){
            throw new Error("Error getting group");
        }
      }

    static async getAll(){
        try{
            const response = await pool.query("SELECT * FROM groupe");
            return response.rows;
        }catch(error){
            throw new Error("Error getting groups");
        }
      }

      async updateGroup(id) {
        try {
          const fields = {};
          if (this.idteacher !== undefined) fields.idteacher = this.idteacher;
          if (this.name !== undefined) fields.name = this.name;
          if (this.description !== undefined) fields.description = this.description;
          if (this.students !== undefined) fields.students = this.students; // Convert array to JSON string
    
          if (Object.keys(fields).length === 0) {
            throw new Error("No fields provided for update.");
          }
    
          const keys = Object.keys(fields);
          const values = Object.values(fields);
          const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
          values.push(id); // Add id to values
    
          const queryText = `UPDATE groupe SET ${setClause} WHERE idgroupe = $${values.length} RETURNING *`;
          const result = await pool.query(queryText, values);
    
          if (result.rowCount === 0) {
            throw new Error("Group not found.");
          }
    
          return result.rows[0];
        } catch (error) {
          console.error('Error updating group:', error.message);
          throw new Error("Error updating group");
        }
      }

}

module.exports = Group;