const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true, trim: true },
    score: { type: Number, default: 0, min: 0, max: 10000 },
  },
  { timestamps: true },
);

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    image: { type: String },
    content: { type: String },
    score: { type: Number, default: 0, min: 0, max: 10000 },
    status: {
      type: String,
      enum: ["created", "removed", "drafted", "published", "approved"],
      required: true,
    },
    comments: { type: [commentSchema], default: [] },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Article", articleSchema);
