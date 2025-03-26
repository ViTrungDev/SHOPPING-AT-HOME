const express = require("express");
const router = express.Router();
const viewProduct = require("../App/Controllers/ProductController/ViewProduct");
const Products = require("../App/Controllers/ProductController/productController");

router.get("/", viewProduct.view);
/*=============================== /products/create ============================= */
router.post("/create", Products.create);
/*=============================== /products/view ============================= */
router.get("/views", Products.view);
/*=============================== /products/view/:slug ============================= */
router.get("/view/:slug", Products.viewSlug);

module.exports = router;
