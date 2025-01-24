class homeController {
  index(req, res) {
    res.render("home.hbs", { title: "Home Page" });
  }
}

module.exports = new homeController();
