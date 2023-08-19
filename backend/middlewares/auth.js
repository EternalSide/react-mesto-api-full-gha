const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/Unauthorized');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Вы не Авторизованы'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    const jwtSecret = process.env.JWT_SECRET || 'TOP_SECRET';

    payload = jwt.verify(token, jwtSecret);

    if (payload) {
      req.user = payload;
    }

    return next();
  } catch (err) {
    throw new UnauthorizedError('Вы не Авторизованы');
  }
};
