const Card = require('../../models/card');

const { CardNotFoundError } = require('../../errors/CardNotFoundError');

// const { ServerError } = require('../../errors/ServerError');

module.exports.addLike = (req, res, next) => {
  const me = req.user.id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    {
      $addToSet: {
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
        throw new CardNotFoundError();
      }
      const { _id, name, owner, link, likes } = user;
      return res.send({
        _id,
        name,
        owner,
        link,
        likes,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new CardNotFoundError();
      }
      throw err;
    })
    .catch(next);
};
