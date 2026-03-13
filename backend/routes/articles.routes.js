const express = require("express");
const router = express.Router();

const {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  addComment,
} = require("../controllers/articles.controller");
const {
  createArticleSchema,
  addCommentSchema,
  updateArticleSchema,
} = require("../dtos/article.dto");
const validateRequest = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");

router.get("/", getArticles);
router.get("/:id", getArticleById);
router.post("/", authenticate, validateRequest(createArticleSchema), createArticle);
router.patch("/:id", authenticate, validateRequest(updateArticleSchema), updateArticle);
router.delete("/:id", authenticate, deleteArticle);
router.post("/:id/comments", authenticate, validateRequest(addCommentSchema), addComment);

module.exports = router;
