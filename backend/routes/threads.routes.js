const express = require("express");
const router = express.Router();

const {
  createThread,
  getThreads,
  getThreadById,
  updateThread,
  deleteThread,
  addMessage,
} = require("../controllers/threads.controller");
const {
  createThreadSchema,
  addMessageSchema,
  updateThreadSchema,
} = require("../dtos/thread.dto");
const validateRequest = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");

router.get("/", getThreads);
router.get("/:id", getThreadById);
router.post("/", authenticate, validateRequest(createThreadSchema), createThread);
router.patch("/:id", authenticate, validateRequest(updateThreadSchema), updateThread);
router.delete("/:id", authenticate, deleteThread);
router.post("/:id/messages", authenticate, validateRequest(addMessageSchema), addMessage);

module.exports = router;
