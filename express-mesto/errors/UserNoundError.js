class UserNoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.message = 'А вот и нет такого пользователя, плохой из тебя сыщик';
  }
}

module.exports = {
  UserNoundError,
};
