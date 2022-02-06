const User = require('../../models/user');

const { UserNoundError } = require('../../errors/UserNoundError');
const { NotFoundIdError } = require('../../errors/NotFoundIdError');

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new UserNoundError();
      }
      const { name, about, avatar, _id } = user;
      return res.send({
        name, about, avatar, _id,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundIdError());
      } else {
        next(err);
      }
    });
};
