const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/NotFound');
const BadRequestError = require('../errors/BadRequest');
const ConflictError = require('../errors/Conflict');

const createUser = async (req, res, next) => {
  try {
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    return res.status(201).json({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
      email: user.email,
    });
  } catch (e) {
    if (e.code === 11000) {
      next(new ConflictError('Пользователь с таким email уже существует.'));
    }
    if (e.name === 'ValidationError') {
      next(new BadRequestError(e.message));
    }
    return next(e);
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);

    const token = jwt.sign({ _id: user._id }, 'TOP_SECRET', {
      expiresIn: '7d',
    });

    return res.json({ token });
  } catch (e) {
    return next(e);
  }
};

const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).exec();

    return res.json(user);
  } catch (e) {
    return next(e);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    return res.json(users);
  } catch (e) {
    return next(e);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).orFail();

    return res.json(user);
  } catch (e) {
    if (e.name === 'CastError') {
      next(new BadRequestError('Некорректный ID'));
    }

    if (e.name === 'DocumentNotFoundError') {
      next(new NotFoundError('Пользователь не найден'));
    }

    return next(e);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
      runValidators: true,
      new: true,
    }).orFail();

    return res.json(updatedUser);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new BadRequestError(e.message));
    }
    if (e.name === 'DocumentNotFoundError') {
      return next(new NotFoundError('Пользователь не найден'));
    }
    return next(e);
  }
};
const updateUserAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        avatar,
      },
      { new: true },
    ).orFail();

    return res.json(updatedUser);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new BadRequestError(e.message));
    }
    if (e.name === 'DocumentNotFoundError') {
      return next(new NotFoundError('Пользователь не найден'));
    }
    return next(e);
  }
};

module.exports = {
  login,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
  getUserInfo,
};
