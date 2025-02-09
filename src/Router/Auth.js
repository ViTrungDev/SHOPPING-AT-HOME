const express = require("express");
const router = express.Router();

const authController = require("../App/Controllers/AuthController");

// register
router.post("/register", authController.register);
router.get("/register", authController.ViewRegister);

module.exports = router;
