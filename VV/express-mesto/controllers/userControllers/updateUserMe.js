const User = require('../../models/user');
const { ValError } = require('../../errors/ValError');
const { UserNoundError } = require('../../errors/UserNoundError');

module.exports.updateUserMe = (req, res, next) => {
  const me = req.user.id;
  const { name, about } = req.body;
  console.log(me);
  // if (!name || !about) {
  //   return res.status(400).send({ message: 'Поля "name" и "about" должно быть заполнены' });
  // }
  return User.findByIdAndUpdate(
    me,
    {
      name,
      about,
    },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      console.log(1);
      if (!user) {
        console.log(2);
        return next(new UserNoundError());
      }
      const { name, about, avatar, _id } = user;

      return res.send({
        name,
        about,
        _id,
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
