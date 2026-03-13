const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AppError = require("../utils/appError");
const { success } = require("../utils/httpResponse");

const buildSafeUser = (userDoc) => {
  const user = userDoc.toObject();
  delete user.password;
  return user;
};

const signToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new AppError(
      500,
      "Configuration manquante: JWT_SECRET n'est pas defini.",
      "CONFIG_ERROR",
    );
  }

  return jwt.sign(
    {
      sub: user._id.toString(),
      roles: user.roles,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    },
  );
};

exports.register = async (req, res, next) => {
  try {
    const payload = req.validateBody || req.body;

    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) {
      return next(new AppError(409, "Cet email est deja utilise.", "CONFLICT_ERROR"));
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const user = await User.create({
      username: payload.username,
      email: payload.email,
      password: hashedPassword,
      settings: payload.settings,
    });

    const token = signToken(user);

    return success(res, 201, "Inscription reussie.", {
      token,
      user: buildSafeUser(user),
    });
  } catch (error) {
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const payload = req.validateBody || req.body;

    const user = await User.findOne({ email: payload.email });
    if (!user) {
      return next(new AppError(401, "Identifiants invalides.", "AUTH_ERROR"));
    }

    const isPasswordValid = await bcrypt.compare(payload.password, user.password);
    if (!isPasswordValid) {
      return next(new AppError(401, "Identifiants invalides.", "AUTH_ERROR"));
    }

    const token = signToken(user);

    return success(res, 200, "Connexion reussie.", {
      token,
      user: buildSafeUser(user),
    });
  } catch (error) {
    return next(error);
  }
};
