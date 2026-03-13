const Joi = require("joi");

const createLogSchema = Joi.object({
  message: Joi.string().trim().required().messages({
    "string.empty": "Le message du log est requis.",
    "any.required": "Le message du log est requis.",
  }),
  url: Joi.string().uri().optional().messages({
    "string.uri": "L'url doit être une URL valide.",
  }),
});

module.exports = { createLogSchema };
