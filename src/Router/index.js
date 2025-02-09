const homeRouter = require("./Home");
const authRouter = require("./Auth");

function router(app) {
  app.use("/auth", authRouter);
  app.use("/", homeRouter);
  app.use((req, res) => {
    console.log("404 Error:", req.url);
    res.status(404).render("NotFound", {
      title: "404 Not Found",
      layout: false,
    });
  });
}

module.exports = router;
