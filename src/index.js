require("dotenv").config({ path: "./src/.env" }); // path to file .env
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const router = require("./Router");
const db = require("./App/Model/db/Connect");

console.log("TOKEN_SECRET:", process.env.TOKEN_SECRET); // Debug

const app = express();
const port = 8080;
// Middleware
app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "Public")));
app.use(express.json()); // Đọc dữ liệu JSON từ body
app.use(express.urlencoded({ extended: true })); // Đọc dữ liệu form từ body

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
db.connect();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
