const Joi = require("joi");

const createThreadSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.empty": "Le titre du thread est requis.",
    "any.required": "Le titre du thread est requis.",
  }),
});

const addMessageSchema = Joi.object({
  content: Joi.string().trim().required().messages({
    "string.empty": "Le contenu du message est requis.",
    "any.required": "Le contenu du message est requis.",
  }),
});

module.exports = { createThreadSchema, addMessageSchema };
