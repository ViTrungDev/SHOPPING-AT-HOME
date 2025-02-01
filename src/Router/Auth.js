const express = require("express");
const router = express.Router();

const authController = require("../App/Controllers/AuthController");

// resgister
router.post("/register", authController.register);

module.exports = router;
