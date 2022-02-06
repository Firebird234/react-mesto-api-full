const userRouter = require('express').Router();
// const { createUser } = require('../controllers/userControllers/createUser');
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { getUserId } = require('../controllers/userControllers/getUserId');
const { getUsers } = require('../controllers/userControllers/getUsers');
const { getUserMe } = require('../controllers/userControllers/getUserMe');
const { updateUserMe } = require('../controllers/userControllers/updateUserMe');
const { updateUserMeAva } = require('../controllers/userControllers/updateUserMeAva');
const { ValError } = require('../errors/ValError');

userRouter.get('/users', getUsers);

userRouter.get('/users/me', getUserMe);

userRouter.get(
  '/users/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex(),
    }),
  }),
  getUserId,
);

// userRouter.post('/users', createUser);

userRouter.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  updateUserMe,
);

userRouter.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .min(2)
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
  updateUserMeAva,
);

module.exports = userRouter;
