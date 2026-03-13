const success = (res, statusCode, message, data = null, meta = null) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    meta,
  });
};

const error = (res, statusCode, message, code = "APP_ERROR", details = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    code,
    details,
  });
};

module.exports = { success, error };
