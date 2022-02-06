class ValError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.message = 'Кажись косяк в введенных данных, будь котиком, проверь';
  }
}

module.exports = {
  ValError,
};
