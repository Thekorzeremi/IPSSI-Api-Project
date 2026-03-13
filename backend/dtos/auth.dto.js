const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().trim().required().messages({
    "string.empty": "Le nom d'utilisateur est requis.",
    "any.required": "Le nom d'utilisateur est requis.",
  }),
  email: Joi.string().email().lowercase().required().messages({
    "string.empty": "L'email est requis.",
    "any.required": "L'email est requis.",
    "string.email": "L'email doit être une adresse email valide.",
  }),
  password: Joi.string().min(8).required().messages({
    "string.empty": "Le mot de passe est requis.",
    "any.required": "Le mot de passe est requis.",
    "string.min": "Le mot de passe doit contenir au moins 8 caractères.",
  }),
  settings: Joi.object({
    newsletter: Joi.boolean().default(false),
  }).default({}),
});

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required().messages({
    "string.empty": "L'email est requis.",
    "any.required": "L'email est requis.",
    "string.email": "L'email doit être une adresse email valide.",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Le mot de passe est requis.",
    "any.required": "Le mot de passe est requis.",
  }),
});

module.exports = { registerSchema, loginSchema };
