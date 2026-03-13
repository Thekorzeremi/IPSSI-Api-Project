const express = require("express");
const router = express.Router();

const { createLog, getLogs } = require("../controllers/logs.controller");
const { createLogSchema } = require("../dtos/log.dto");
const validateRequest = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");

router.get("/", authenticate, getLogs);
router.post("/", authenticate, validateRequest(createLogSchema), createLog);

module.exports = router;
