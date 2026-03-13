const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/users.controller');
const { createUserSchema } = require('../dtos/user.dto');
const validateRequest = require('../middlewares/validate');

router.post('/', validateRequest(createUserSchema), createUser);

module.exports = router;