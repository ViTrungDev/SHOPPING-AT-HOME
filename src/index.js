const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");

const app = express();
const port = 8080;

app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "Public")));
app.engine(
  "hbs",
  handlebars.engine({
    // rút ngắn tên đuôi file handlebars thành hbs
    extname: ".hbs",
    layoutsDir: path.join(__dirname, "Resources/Views/Layouts"), // Đường dẫn đến layouts
    partialsDir: path.join(__dirname, "Resources/Views/Partials"),
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "Resources/Views"));
app.set("partials", path.join(__dirname, "Resources/Partials"));

app.get("/home", (req, res) => {
  // res.render("home");
  res.send("Hello World");
});
app.get("/new", (req, res) => {
  res.render("new");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
