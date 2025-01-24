const express = require("express");
const router = express.Router();
const homeController = require("../App/Controllers/homeController");

// Định nghĩa route
router.get("/", homeController.index);

module.exports = router;
