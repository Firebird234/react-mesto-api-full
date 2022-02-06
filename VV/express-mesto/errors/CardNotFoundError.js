class CardNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.message = 'Нетю тута такой карточки';
  }
}

module.exports = {
  CardNotFoundError,
};
