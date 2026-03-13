const AppError = require("../utils/appError");

const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((d) => ({
        field: d.context.key,
        message: d.message,
      }));
      return next(new AppError(400, "Erreur de validation.", "VALIDATION_ERROR", errors));
    }
    req.validateBody = value;
    next();
  };
};

module.exports = validate;
