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

    static async deleteAsset(id){
        try{
            await pool.query("DELETE FROM asset WHERE idasset = $1", [id]);
        }catch(error){
            throw new Error("Error deleting asset");
        }
      }

    static async getAsset(id){
        try{
            const response = await pool.query("SELECT * FROM asset WHERE idasset = $1", [id]);
            return response.rows[0];
        }catch(error){
            throw new Error("Error getting asset");
        }
      }

    static async getAll(){
        try{
            const response = await pool.query("SELECT * FROM asset");
            return response.rows;
        }catch(error){
            throw new Error("Error getting assets");
        }
      }


      async updateAsset(id) {
        try {
          const fields = {};
          if (this.idcourse !== undefined) fields.idcourse = this.idcourse;
          if (this.name !== undefined) fields.name = this.name;
          if (this.type !== undefined) fields.type = this.type;
          if (this.url !== undefined) fields.url = this.url;
          if (this.description !== undefined) fields.description = this.description;
          if (this.size !== undefined) fields.size = this.size;
          if (this.position !== undefined) fields.position = this.position;
          if (this.scale !== undefined) fields.scale = this.scale;
          if (this.rotation !== undefined) fields.rotation = this.rotation;
    
          if (Object.keys(fields).length === 0) {
            throw new Error("No fields provided for update.");
          }
    
          const keys = Object.keys(fields);
          const values = Object.values(fields);
          const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
          values.push(id); // Add id to values
    
          const queryText = `UPDATE asset SET ${setClause} WHERE idasset = $${values.length} RETURNING *`;
          const result = await pool.query(queryText, values);
    
          if (result.rowCount === 0) {
            throw new Error("Asset not found.");
          }
    
          return result.rows[0];
        } catch (error) {
          console.error('Error updating asset:', error.message);
          throw new Error("Error updating asset");
        }
      }
}

module.exports = Asset;