const express = require("express");
const router = express.Router();

const authController = require("../App/Controllers/AuthController");

// register
router.post("/register", authController.register);
router.get("/register", authController.ViewRegister);
router.get("/login", authController.ViewLogin);
router.post("/login", authController.login);

module.exports = router;
