const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true, trim: true },
    score: { type: Number, default: 0, min: 0, max: 10000 },
  },
  { timestamps: true },
);

const threadSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, default: 0, min: 0, max: 10000 },
    lastMessageAt: { type: Date },
    messages: { type: [messageSchema], default: [] },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Thread", threadSchema);
