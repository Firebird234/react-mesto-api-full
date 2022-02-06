const User = require('../../models/user');

const { ValError } = require('../../errors/ValError');
const { UserNoundError } = require('../../errors/UserNoundError');

module.exports.updateUserMeAva = (req, res, next) => {
  const me = req.user.id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    me,
    {
      avatar,
    },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (!user) {
        return next(new UserNoundError());
      }
      const { avatar } = user;
      return res.send({
        avatar,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValError());
      } else {
        next(err);
      }
    });
};
