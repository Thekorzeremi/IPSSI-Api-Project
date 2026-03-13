const Thread = require("../models/Thread");
const AppError = require("../utils/appError");
const { success } = require("../utils/httpResponse");
const { getPagination, buildPaginationMeta } = require("../utils/pagination");

exports.createThread = async (req, res, next) => {
  try {
    const payload = req.validateBody || req.body;

    const thread = await Thread.create({
      ...payload,
      authorId: req.user.id,
    });

    return success(res, 201, "Thread cree.", thread);
  } catch (error) {
    return next(error);
  }
};

exports.getThreads = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const [threads, total] = await Promise.all([
      Thread.find().populate("authorId", "username email").skip(skip).limit(limit),
      Thread.countDocuments(),
    ]);

    return success(
      res,
      200,
      "Threads recuperes.",
      threads,
      buildPaginationMeta(total, page, limit),
    );
  } catch (error) {
    return next(error);
  }
};

exports.getThreadById = async (req, res, next) => {
  try {
    const thread = await Thread.findById(req.params.id)
      .populate("authorId", "username email")
      .populate("messages.authorId", "username email");

    if (!thread) {
      return next(new AppError(404, "Thread introuvable.", "NOT_FOUND"));
    }

    return success(res, 200, "Thread recupere.", thread);
  } catch (error) {
    return next(error);
  }
};

exports.updateThread = async (req, res, next) => {
  try {
    const payload = req.validateBody || req.body;

    const thread = await Thread.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!thread) {
      return next(new AppError(404, "Thread introuvable.", "NOT_FOUND"));
    }

    return success(res, 200, "Thread mis a jour.", thread);
  } catch (error) {
    return next(error);
  }
};

exports.deleteThread = async (req, res, next) => {
  try {
    const thread = await Thread.findByIdAndDelete(req.params.id);

    if (!thread) {
      return next(new AppError(404, "Thread introuvable.", "NOT_FOUND"));
    }

    return success(res, 200, "Thread supprime.", null);
  } catch (error) {
    return next(error);
  }
};

exports.addMessage = async (req, res, next) => {
  try {
    const payload = req.validateBody || req.body;

    const thread = await Thread.findById(req.params.id);
    if (!thread) {
      return next(new AppError(404, "Thread introuvable.", "NOT_FOUND"));
    }

    thread.messages.push({
      authorId: req.user.id,
      content: payload.content,
    });
    thread.lastMessageAt = new Date();

    await thread.save();

    return success(res, 201, "Message ajoute.", thread);
  } catch (error) {
    return next(error);
  }
};
