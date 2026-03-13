const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /@/,
    },
    password: { type: String, required: true },
    roles: { type: [String], default: ["ROLE_USER"] },
    reputation: { type: Number, default: 0, min: 0, max: 100000 },
    settings: {
      newsletter: { type: Boolean, default: false },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
