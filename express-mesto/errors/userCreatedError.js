class UserCreatedError extends Error {
  constructor(message) {
    super(message);
    this.message = 'Такой мэйл уже зарегистрирован';
    this.statusCode = 409;
  }
}

module.exports = {
  UserCreatedError,
};
