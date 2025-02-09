const bcrypt = require("bcrypt");
const User = require("../Model/User_data/User");
const path = require("path");
class AuthController {
  ViewRegister(req, res) {
    res.sendFile(
      path.join(__dirname, "../../Resources/Views/Auth/register.html")
    );
  }
  async register(req, res) {
    try {
      // check data from request
      const { username, password, email, phone, surname } = req.body;
      if (!username || !password || !email || !phone || !surname) {
        return res.status(400).json({ message: "All fields are required" });
      }
      // check email from request
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
      // hash password
      console.log("Received request:", req.body);
      const salt = await bcrypt.genSalt(10);
      const hasherPassword = await bcrypt.hash(password, salt);
      console.log("Hasher password:", hasherPassword);

      //   create new user
      const newUser = new User({
        username,
        password: hasherPassword,
        email,
        phone,
        surname,
      });
      console.log("New user:", newUser);
      //   save user
      const user = await newUser.save();
      console.log("User:", user);
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();
