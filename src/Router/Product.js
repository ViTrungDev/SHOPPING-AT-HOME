const express = require("express");
const router = express.Router();
const viewProduct = require("../App/Controllers/ProductController/ViewProduct");

router.get("/", viewProduct.view);

module.exports = router;
