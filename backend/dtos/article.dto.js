const Joi = require("joi");

const createArticleSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.empty": "Le titre de l'article est requis.",
    "any.required": "Le titre de l'article est requis.",
  }),
  image: Joi.string().uri().optional().messages({
    "string.uri": "L'image doit être une URL valide.",
  }),
  content: Joi.string().optional(),
  status: Joi.string()
    .valid("created", "removed", "drafted", "published", "approved")
    .default("created")
    .messages({
      "any.only":
        "Le statut doit être : created, removed, drafted, published ou approved.",
    }),
});

const addCommentSchema = Joi.object({
  content: Joi.string().trim().required().messages({
    "string.empty": "Le contenu du commentaire est requis.",
    "any.required": "Le contenu du commentaire est requis.",
  }),
});

const updateArticleSchema = Joi.object({
  title: Joi.string().trim(),
  image: Joi.string().uri(),
  content: Joi.string(),
  status: Joi.string().valid("created", "removed", "drafted", "published", "approved"),
}).min(1);

module.exports = { createArticleSchema, addCommentSchema, updateArticleSchema };
