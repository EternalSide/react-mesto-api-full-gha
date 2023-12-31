const express = require('express');

const router = express.Router();

const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserById,
  getUserInfo,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

const { urlRegex } = require('../utils/regex');

router.get('/', getUsers);
router.get('/me', getUserInfo);

router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex().required(),
    }),
  }),
  getUserById,
);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUser,
);
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().pattern(urlRegex),
    }),
  }),
  updateUserAvatar,
);

module.exports = router;
