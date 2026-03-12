const Joi = require('joi');

const userSchema = Joi.object({
    username: Joi.string().trim().required().messages({
        'string.empty': 'Le nom d\'utilisateur est requis.'
    }),
    email: Joi.string().email().lowercase().required().messages({
        'string.empty': 'L\'email est requis.',
        'string.email': 'L\'email doit être une adresse email valide.'
    }),
    password: Joi.string().min(8).required().messages({
        'string.empty': 'Le mot de passe est requis.',
        'string.min': 'Le mot de passe doit contenir au moins 8 caractères.'
    }),
    roles: Joi.array().items(Joi.string()).default(['ROLE_USER']),
    reputation: Joi.number().integer().min(0).max(100000).default(0),
    settings: Joi.object({
        newsletter: Joi.boolean().default(false)
    }).default({})
});

module.exports = { userSchema };