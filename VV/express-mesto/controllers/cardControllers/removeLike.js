const Card = require('../../models/card');

const { CardNotFoundError } = require('../../errors/CardNotFoundError');

module.exports.removeLike = (req, res, next) => {
  const me = req.user.id;
  console.log(me);
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    {
      $pull: {
        likes: me,
      },
    },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (!user) {
        return next(new CardNotFoundError());
      }
      const { name, link, owner, likes, _id } = user;
      return res.send({
        name,
        link,
        owner,
        likes,
        _id,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CardNotFoundError());
      } else {
        next(err);
      }
    });
};
