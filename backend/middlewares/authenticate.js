const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError(401, "Token manquant.", "AUTH_ERROR"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: payload.sub,
      roles: payload.roles || [],
    };
    return next();
  } catch (error) {
    return next(new AppError(401, "Token invalide ou expire.", "AUTH_ERROR"));
  }
};

module.exports = authenticate;
