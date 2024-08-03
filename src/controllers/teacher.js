const bcrypt = require('bcrypt');
const Teacher = require('../models/teacher');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
      (hash) => {
        const { firstName, lastName, email, password , birthDate, specialization } = req.body;
        const teacher = new Teacher(firstName, lastName, birthDate, email, hash ,specialization);
        teacher.register().then(
          () => {
            res.status(201).json({
              message: 'Teacher added successfully!',
              success: true
            });
          }
        ).catch(
          (error) => {
            res.status(500).json({
              error: error,
              success: false
            });
          }
        );
      }
    );
  };



  exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const response = await Teacher.login(email, password);
      res.status(200).json(response);
      console.log(response);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  };
  

  exports.getTeacher = async (req,res)=>{
      const { id } = req.params;
      try{
        const response = await Teacher.get(id);
        res.status(201).json(response);
      }catch( error ){
        res.status(401).json({error: error.message});
      }
  }