const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/Unauthorized');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Вы не Авторизованы');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'TOP_SECRET');
  } catch (err) {
    throw new UnauthorizedError('Вы не Авторизованы');
  }

  req.user = payload;

  return next();
};
