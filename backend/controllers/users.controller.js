const User = require("../models/User");
const bcrypt = require("bcrypt");
const AppError = require("../utils/appError");
const { success } = require("../utils/httpResponse");
const { getPagination, buildPaginationMeta } = require("../utils/pagination");

const sanitizeUser = (userDoc) => {
  const user = userDoc.toObject();
  delete user.password;
  return user;
};

exports.createUser = async (req, res, next) => {
  try {
    const payload = req.validateBody || req.body;

    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) {
      return next(new AppError(409, "Cet email est deja utilise.", "CONFLICT_ERROR"));
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const user = await User.create({
      ...payload,
      password: hashedPassword,
    });

    return success(res, 201, "Utilisateur cree.", sanitizeUser(user));
  } catch (error) {
    return next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const [users, total] = await Promise.all([
      User.find().select("-password").skip(skip).limit(limit),
      User.countDocuments(),
    ]);

    return success(
      res,
      200,
      "Utilisateurs recuperes.",
      users,
      buildPaginationMeta(total, page, limit),
    );
  } catch (error) {
    return next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return next(new AppError(404, "Utilisateur introuvable.", "NOT_FOUND"));
    }
    return success(res, 200, "Utilisateur recupere.", user);
  } catch (error) {
    return next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const payload = req.validateBody || req.body;
    const user = await User.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return next(new AppError(404, "Utilisateur introuvable.", "NOT_FOUND"));
    }

    return success(res, 200, "Utilisateur mis a jour.", user);
  } catch (error) {
    return next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return next(new AppError(404, "Utilisateur introuvable.", "NOT_FOUND"));
    }

    return success(res, 200, "Utilisateur supprime.", null);
  } catch (error) {
    return next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return next(new AppError(404, "Utilisateur introuvable.", "NOT_FOUND"));
    }

    return success(res, 200, "Profil recupere.", user);
  } catch (error) {
    return next(error);
  }
};
