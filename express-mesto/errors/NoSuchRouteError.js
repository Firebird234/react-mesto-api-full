class NoSuchRouteError extends Error {
  constructor(message) {
    super(message);
    this.message = 'Чет ниработает ничо, ну соре тогда';
    this.statusCode = 404;
  }
}

module.exports = {
  NoSuchRouteError,
};
