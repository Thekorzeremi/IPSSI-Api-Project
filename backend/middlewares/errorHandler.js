const { error } = require("../utils/httpResponse");

const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    const details = Object.values(err.errors).map((item) => ({
      field: item.path,
      message: item.message,
    }));

    return error(res, 400, "Erreur de validation Mongoose.", "VALIDATION_ERROR", details);
  }

  if (err.name === "CastError") {
    return error(
      res,
      400,
      `Identifiant invalide pour le champ ${err.path}.`,
      "INVALID_ID",
    );
  }

  if (err.code === 11000) {
    return error(
      res,
      409,
      "Conflit de donnees (valeur unique deja existante).",
      "DUPLICATE_KEY",
      err.keyValue,
    );
  }

  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return error(res, 401, "Token invalide ou expire.", "AUTH_ERROR");
  }

  const statusCode = err.statusCode || 500;
  const code = err.code || "INTERNAL_ERROR";
  const details = err.details || null;

  return error(
    res,
    statusCode,
    err.message || "Erreur interne du serveur.",
    code,
    details,
  );
};

module.exports = errorHandler;
