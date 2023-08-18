const express = require('express');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config();
const { errors } = require('celebrate');

const PORT = process.env.PORT || 3000;
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const errorHandler = require('./middlewares/error-handler');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

// Routes
const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const NotFoundError = require('./errors/NotFound');

const {
  loginValidation,
  registerValidation,
} = require('./middlewares/validation');

// Apply the rate limiting middleware to all requests
app.use(limiter);

// middleware
app.use(helmet());
app.use(express.json());
app.use(requestLogger); // подключаем логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginValidation, login);
app.post('/signup', registerValidation, createUser);

// Auth middleware
app.use(auth);

app.use('/users', usersRoute);
app.use('/cards', cardsRoute);

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());

app.use((req, res, next) => {
  next(new NotFoundError('Некорректный запрос'));
});

app.use(errorHandler);

// ДБ и запуск Сервера
const connectToDb = async () => {
  try {
    const isConnectedToDb = mongoose.connect(
      'mongodb://127.0.0.1:27017/mestodb',
    );

    if (isConnectedToDb) {
      console.log('Подключение к БД успешно.');
    }
  } catch (e) {
    console.log(`Не удалось подключиться к БД, Ошибка :${e}`);
  }
};

connectToDb();

app.listen(PORT, () => console.log(`Сервер Запущен, Порт:${PORT}`));
