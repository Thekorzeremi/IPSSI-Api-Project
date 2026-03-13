const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    message: { type: String, required: true, trim: true },
    url: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

module.exports = mongoose.model("Log", logSchema);
