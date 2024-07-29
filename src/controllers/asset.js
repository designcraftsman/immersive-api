const Asset = require("../models/asset");

exports.addAsset = async (req, res) => {
    try {
      const { idcourse ,name, type , url , description , size , position, scale , rotation } = req.body;
      const asset = new Asset(idcourse ,name, type , url , description , size , position, scale , rotation );
      const response= await asset.addAsset();
      res.status(201).json({ message: "Group added successfully", group: response });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "An error occurred" });
    }
};


