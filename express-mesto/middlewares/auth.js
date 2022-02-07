require('dotenv').config();

const { JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const { Authorization } = require('../errors/Authorization');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(new Authorization());
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new Authorization());
  }
  req.user = payload;
  console.log(req.params);
  return next();
};

// module.exports.auth = (req, res, next) => {
//   const authorization = req.cookies.token;

//   if (!authorization) {
//     return next(new Authorization());
//   }
//   let payload;
//   try {
//     payload = jwt.verify(authorization, 'abrakadabra,kurwa');
//   } catch (err) {
//     return next(new Authorization());
//   }

//   req.user = payload;
//   return next();
// };
