//verifyToken.js
const jsonToken = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      jsonToken.verify(authHeader, process.env.KEY_JWT, (err, user) => {
        if (err) {
          return res.status(403).json({ error: true, message: "Token is invalid!" });
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json({ error: true, message: "You are not authenticated!" });
    }
  };

const verifyTokenAndAuth = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.query.id) {
            next();
        } else {
            res.status(403).json("You are not allowed!")
        }
    });
};

module.exports = {
    verifyToken,
    verifyTokenAndAuth
}