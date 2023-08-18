const BadRequestError = require('../errors/BadRequest');
const ForbiddenError = require('../errors/Forbidden');
const NotFoundError = require('../errors/NotFound');
const Card = require('../models/card');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});

    return res.status(200).json(cards);
  } catch (e) {
    return next(e);
  }
};

const postCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;

    const newCard = await Card.create({
      name,
      link,
      owner: req.user._id,
    });

    return res.status(201).json(newCard);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new BadRequestError(e.message));
    }
    return next(e);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;

    const card = await Card.findById(cardId).orFail();
    const isUserOwner = card.owner.toString() === req.user._id;

    if (!isUserOwner) {
      throw new ForbiddenError('У вас нет прав удалить эту карточку');
    }

    const deletedCard = await Card.deleteOne(card).orFail();

    return res.status(200).json({ message: 'Карта удалена', deletedCard });
  } catch (e) {
    if (e.name === 'DocumentNotFoundError') {
      return next(new NotFoundError('Карточка не найдена'));
    }
    if (e.name === 'CastError') {
      return next(new NotFoundError('Некорректный ID'));
    }
    return next(e);
  }
};

const deleteLike = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { cardId } = req.params;

    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true },
    ).orFail();

    return res.status(200).json(updatedCard);
  } catch (e) {
    if (e.name === 'DocumentNotFoundError') {
      return next(new NotFoundError('Карточка не найдена'));
    }
    if (e.name === 'CastError') {
      return next(new NotFoundError('Некорректный ID'));
    }
    return next(e);
  }
};

const putLike = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { cardId } = req.params;

    const likedCard = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    ).orFail();

    return res.status(200).json(likedCard);
  } catch (e) {
    if (e.name === 'DocumentNotFoundError') {
      return next(new NotFoundError('Карточка не найдена'));
    }
    if (e.name === 'CastError') {
      return next(new NotFoundError('Некорректный ID'));
    }
    return next(e);
  }
};

module.exports = {
  getCards,
  postCard,
  deleteCard,
  deleteLike,
  putLike,
};
