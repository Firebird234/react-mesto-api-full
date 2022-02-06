const User = require('../../models/user');

module.exports.getUserMe = (req, res, next) => {
  console.log('444', req.user.id);
  User.findById(req.user.id)
    .then(({ name, about, avatar, _id, email }) => res.status(200).send({
      name,
      about,
      avatar,
      _id,
      email,
    }))
    .catch((err) => {
      next(err);
    });
};
