const AppError = require("../utils/appError");

const notFound = (req, res, next) => {
  return next(new AppError(404, "Route non trouvee.", "NOT_FOUND"));
};

module.exports = notFound;
