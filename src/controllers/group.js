const Group = require("../models/group");

exports.addGroup = async (req, res) => {
    try {
      const { idteacher, name, description , students } = req.body;
      const group = new Group(idteacher, name, description, students );
      const response= await group.addGroup();
      res.status(201).json({ message: "Group added successfully", group: response });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "An error occurred" });
    }
};


exports.deleteGroup = async (req, res) => {
    try {
      const { id } = req.params;
      const response = await Group.deleteGroup(id);
      res.status(200).json({ message: "Group deleted successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "An error occurred" });
    }
};

exports.getGroup = async (req, res) => {
    try {
      const { id } = req.params;
      const group = await Group.getGroup(id);
      res.status(200).json({ group });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "An error occurred" });
    }
};

exports.getAllGroups = async (req, res) =>{
    try {
      const groups = await Group.getAll();
      res.status(200).json({ groups });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "An error occurred" });
    }
}

exports.updateGroup = async (req, res) => {
    try {
      const { id } = req.params;
      const { idteacher, name, description , students } = req.body;
      const group = new Group(idteacher, name, description, students );
      const response = await group.updateGroup(id);
      res.status(200).json({ message: "Group updated successfully", group: response });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "An error occurred" });
    }
};