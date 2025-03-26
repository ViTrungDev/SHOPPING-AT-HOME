const productDb = require("../../Model/ProductDB/productDB");
const { mongooseToObject } = require("../../../Util/mongoose");
const mongoose = require("mongoose");
class productController {
  // [POST] /product/create
  create(req, res) {
    const product = new productDb(req.body);
    product
      .save()
      .then((savedProduct) => {
        console.log("Sản phẩm đã được lưu thành công:", savedProduct);
        res
          .status(201)
          .json({ message: "Tạo sản phẩm thành công!", product: savedProduct });
      })
      .catch((error) => {
        console.error("Lỗi khi lưu sản phẩm:", error);
        res
          .status(500)
          .json({ message: "Lỗi khi tạo sản phẩm", error: error.message });
      });
  }
  // [GET] /product/view
  view(req, res) {
    productDb
      .find()
      .then((products) => {
        res.json({
          message: "Lấy danh sách sản phẩm thành công",
          products: products.map((product) => mongooseToObject(product)),
        });
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        res.status(500).json({
          message: "Lỗi khi lấy danh sách sản phẩm",
          error: error.message,
        });
      });
  }
  // [GET] /product/view/:slug
  viewSlug(req, res) {
    productDb.findOne({ slug: req.params.slug }).then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Sản phẩm không tồn tại" });
      }
      res.json({
        message: "Lấy sản phẩm thành công",
        product: mongooseToObject(product),
      });
    });
  }
}
module.exports = new productController();
