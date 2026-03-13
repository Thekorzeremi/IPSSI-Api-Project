const Log = require("../models/Log");
const { success } = require("../utils/httpResponse");
const { getPagination, buildPaginationMeta } = require("../utils/pagination");

exports.createLog = async (req, res, next) => {
  try {
    const payload = req.validateBody || req.body;

    const log = await Log.create({
      ...payload,
      userId: req.user.id,
    });

    return success(res, 201, "Log cree.", log);
  } catch (error) {
    return next(error);
  }
};

exports.getLogs = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const [logs, total] = await Promise.all([
      Log.find()
        .sort({ createdAt: -1 })
        .populate("userId", "username email")
        .skip(skip)
        .limit(limit),
      Log.countDocuments(),
    ]);

    return success(
      res,
      200,
      "Logs recuperes.",
      logs,
      buildPaginationMeta(total, page, limit),
    );
  } catch (error) {
    return next(error);
  }
};
