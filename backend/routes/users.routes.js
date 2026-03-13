const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getMe,
} = require("../controllers/users.controller");
const { createUserSchema, updateUserSchema } = require("../dtos/user.dto");
const validateRequest = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");

router.post("/", validateRequest(createUserSchema), createUser);
router.get("/me", authenticate, getMe);
router.get("/", authenticate, getUsers);
router.get("/:id", authenticate, getUserById);
router.patch("/:id", authenticate, validateRequest(updateUserSchema), updateUser);
router.delete("/:id", authenticate, deleteUser);

module.exports = router;
