class ServerError extends Error {
  constructor(message) {
    super(message);
    this.message = 'Ошибка сервера';
    this.statusCode = 500;
  }
}

module.exports = {
  ServerError,
};
