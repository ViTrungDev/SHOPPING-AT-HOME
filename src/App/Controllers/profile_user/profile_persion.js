class profile_persion {
  index(req, res) {
    res.render("Auth/profile.hbs");
  }
}
module.exports = new profile_persion();
