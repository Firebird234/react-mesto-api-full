const User = require('../../models/user');

const { ServerError } = require('../../errors/ServerError');

module.exports.getUsers = (req, res, next) => {
  User.find()
    .then((user) => res.send(user))
    .catch(() => {
      throw new ServerError();
    })
    .catch(next);
};
