const User = require('../models/user');

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.validateBody || req.body);
        user.password = undefined;
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de l'utilisateur : " + error.message });
    }
};