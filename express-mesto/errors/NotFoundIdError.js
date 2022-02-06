class NotFoundIdError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.message = 'Не найдено';
  }
}

module.exports = {
  NotFoundIdError,
};
