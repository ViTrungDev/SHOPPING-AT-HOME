class ViewProduct {
  view(req, res) {
    res.render("products/product_details.hbs", { title: "Product detail" });
  }
}
module.exports = new ViewProduct();
