
const jwt = require('jsonwebtoken');
require('dotenv');
const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const token =  req.cookies.token;
  
    if(!token) {
      return res.status(401).json({message: 'You are not signed in'});
    }
  
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json( { message: 'unauthorized' });
    }
};

module.exports = authMiddleware;