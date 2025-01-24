const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const router = require("./Router");

const app = express();
const port = 8080;

// Middleware
app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "Public")));

// Cấu hình Handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    layoutsDir: path.join(__dirname, "Resources/Views/Layout"),
    partialsDir: path.join(__dirname, "Resources/Views/Partials"),
    defaultLayout: "main",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "Resources/Views"));

router(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
