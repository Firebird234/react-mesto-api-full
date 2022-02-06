class NotCardOwnerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.message = 'Эта кароточка не в твоей власти, weakAss';
  }
}

module.exports = {
  NotCardOwnerError,
};
