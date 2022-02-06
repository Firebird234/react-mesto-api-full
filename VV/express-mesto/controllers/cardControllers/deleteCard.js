const Card = require('../../models/card');

const { NotFoundIdError } = require('../../errors/NotFoundIdError');

const { NotCardOwnerError } = require('../../errors/NotCardOwnerError');
const { UserNoundError } = require('../../errors/UserNoundError');

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new UserNoundError();
    })
    .then((card) => {
      console.log('card found');
      if (req.user.id === card.owner.toString()) {
        console.log('if = TRUE');
        return Card.findByIdAndRemove(req.params.cardId).then((user) => {
          if (!user) {
            throw new NotFoundIdError();
          }
          const { name, link, owner, likes, _id } = user;

          return res.send({
            name, link, owner, likes, _id,
          });
        });
      }
      throw new NotCardOwnerError();
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        console.log('catch inside if');
        next(new NotFoundIdError());
      } else {
        console.log('catch outside if');
        next(err);
      }
    });
  // .catch((err) => {
  //   if (err.name === 'CastError') {
  //     console.log('catch inside if');
  //     throw new NotFoundIdError();
  //   }
  //   console.log('catch outside if');
  //   throw new ServerError();
  // })
  // .catch(next);
};
