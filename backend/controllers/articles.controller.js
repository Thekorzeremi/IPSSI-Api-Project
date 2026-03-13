const Article = require("../models/Article");
const AppError = require("../utils/appError");
const { success } = require("../utils/httpResponse");
const { getPagination, buildPaginationMeta } = require("../utils/pagination");

exports.createArticle = async (req, res, next) => {
  try {
    const payload = req.validateBody || req.body;

    const article = await Article.create({
      ...payload,
      authorId: req.user.id,
    });

    return success(res, 201, "Article cree.", article);
  } catch (error) {
    return next(error);
  }
};

exports.getArticles = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const [articles, total] = await Promise.all([
      Article.find().populate("authorId", "username email").skip(skip).limit(limit),
      Article.countDocuments(),
    ]);

    return success(
      res,
      200,
      "Articles recuperes.",
      articles,
      buildPaginationMeta(total, page, limit),
    );
  } catch (error) {
    return next(error);
  }
};

exports.getArticleById = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate("authorId", "username email")
      .populate("comments.authorId", "username email");

    if (!article) {
      return next(new AppError(404, "Article introuvable.", "NOT_FOUND"));
    }

    return success(res, 200, "Article recupere.", article);
  } catch (error) {
    return next(error);
  }
};

exports.updateArticle = async (req, res, next) => {
  try {
    const payload = req.validateBody || req.body;

    const article = await Article.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!article) {
      return next(new AppError(404, "Article introuvable.", "NOT_FOUND"));
    }

    return success(res, 200, "Article mis a jour.", article);
  } catch (error) {
    return next(error);
  }
};

exports.deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      return next(new AppError(404, "Article introuvable.", "NOT_FOUND"));
    }

    return success(res, 200, "Article supprime.", null);
  } catch (error) {
    return next(error);
  }
};

exports.addComment = async (req, res, next) => {
  try {
    const payload = req.validateBody || req.body;

    const article = await Article.findById(req.params.id);
    if (!article) {
      return next(new AppError(404, "Article introuvable.", "NOT_FOUND"));
    }

    article.comments.push({
      authorId: req.user.id,
      content: payload.content,
    });

    await article.save();

    return success(res, 201, "Commentaire ajoute.", article);
  } catch (error) {
    return next(error);
  }
};
