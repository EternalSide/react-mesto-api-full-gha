const { Schema, model } = require('mongoose');

const bcrypt = require('bcrypt');
const UnauthorizedError = require('../errors/Unauthorized');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email обязателен  к заполнению'],
      minlength: 2,
      maxlength: 111,
      unique: true,
      validate: {
        validator(email) {
          return /^\S+@\S+\.\S+$/.test(email);
        },
        message: 'Введите Email',
      },
    },
    password: {
      type: String,
      required: [true, 'Пароль обязателен  к заполнению'],
      select: false,
    },

    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: 2,
      maxlength: 30,
    },

    about: {
      type: String,
      default: 'Исследователь',
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator(url) {
          return /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(
            url,
          );
        },
      },
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль.');
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError('Неправильные почта или пароль.');
        }

        return user;
      });
    });
};

const User = model('user', userSchema);

module.exports = User;
