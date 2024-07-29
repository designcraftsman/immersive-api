const pool = require("../database/db");

class Asset{
    constructor(idcourse ,name, type, url,description, size, position, scale, rotation) {
       this.idcourse = idcourse;
        this.name = name;
        this.type = type;
        this.url = url;
        this.description = description;
        this.size = JSON.stringify(size);
        this.position = JSON.stringify(position);
        this.scale = JSON.stringify(scale);
        this.rotation = JSON.stringify(rotation);
    }

    async addAsset() {
        try {
          await pool.query(
            "INSERT INTO asset (idcourse ,name, type , url , description , size , position, scale , rotation) VALUES ($1, $2, $3 ,$4, $5, $6, $7, $8 , $9)",
            [this.idcourse, this.name, this.type , this.url , this.description , this.size , this.position, this.scale , this.rotation]
          );
          console.log("Asset added");
        } catch (error) {
          throw new Error("Error adding asset");
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

module.exports = Asset;