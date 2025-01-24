const homeRouter = require("./Home");

function router(app) {
  app.use("/", homeRouter);

  app.use((req, res) => {
    res.status(404).render("NotFound.hbs", {
      title: "404 Not Found",
      layout: false,
    });
  });
}

module.exports = router;
