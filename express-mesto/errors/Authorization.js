class Authorization extends Error {
  constructor(message) {
    super(message);
    this.message = 'Необходима авторизация';
    this.statusCode = 401;
  }
}

module.exports = {
  Authorization,
};
