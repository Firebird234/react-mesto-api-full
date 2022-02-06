class IncorrectTokenError extends Error {
  constructor(message) {
    super(message);
    this.message = 'Проблемы с логином или поролем, но это неточно';
    this.statusCode = 401;
  }
}

module.exports = {
  IncorrectTokenError,
};
