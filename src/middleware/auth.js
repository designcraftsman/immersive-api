const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'TOKEN_SECRET');
    const teacherId = decodedToken.id;
    if (req.body.teacherid && req.body.teacherid !== teacherId) {
      throw 'Invalid teacher ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};