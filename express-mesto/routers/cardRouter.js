const cardRouter = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { createCard } = require('../controllers/cardControllers/createCard');
const { getCards } = require('../controllers/cardControllers/getCards');
const { deleteCard } = require('../controllers/cardControllers/deleteCard');
const { addLike } = require('../controllers/cardControllers/addLike');
const { removeLike } = require('../controllers/cardControllers/removeLike');

const { ValError } = require('../errors/ValError');

cardRouter.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string()
        .required()
        .custom((value) => {
          if (
            !validator.isURL(value, {
              require_protocol: true,
            })
          ) {
            throw new ValError();
          }
          return value;
        }),
    }),
  }),
  createCard,
);

cardRouter.get('/cards', getCards);

cardRouter.delete(
  '/cards/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex(),
    }),
  }),
  deleteCard,
);

cardRouter.put(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex(),
    }),
  }),
  addLike,
);

cardRouter.delete(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex(),
    }),
  }),
  removeLike,
);

module.exports = cardRouter;
