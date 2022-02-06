const Card = require('../../models/card');
const { ValError } = require('../../errors/ValError');

const { ServerError } = require('../../errors/ServerError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = [req.user.id];
  console.log(owner);
  Card.create({
    name, link, owner,
  })
    .then(({ name, link, owner, likes, _id }) => res.send({
      name, link, owner, likes, _id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValError();
      }
      throw new ServerError();
    })
    .catch(next);
};
