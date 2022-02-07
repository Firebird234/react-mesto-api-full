require('dotenv').config();

const { JWT_SECRET } = process.env;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const { IncorrectTokenError } = require('../../errors/incorrectTokenError');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({
    email,
  })
    .select('+password')
    .then((data) => {
      if (!data) {
        return Promise.reject(new Error('У кого то кривые ручки-почта или пароль не правильные'));
      }
      console.log(data);
      req.userId = data._id;
      return bcrypt.compare(password, data.password);
    })
    .then((passed) => {
      if (!passed) {
        return Promise.reject(new Error('У кого то кривые ручки-почта или пароль не правильные'));
      }

      const id = req.userId;
      const token = jwt.sign(
        {
          id,
        },
        JWT_SECRET,
        {
          expiresIn: 3600 * 24 * 7,
        },
      );
      console.log('login', token);
      return res.status(200).send({
        token,
      });
    })
    .catch(() => {
      throw new IncorrectTokenError();
    })
    .catch(next);
};
