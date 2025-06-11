class adminController {
  index(req, res) {
    res.render("./admin/admin",{
      title:"Admin",
      layout: false,
    });
  }
}
module.exports = new adminController();
