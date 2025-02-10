const bcrypt = require("bcrypt");
const User = require("../Model/User_data/User");
const path = require("path");
const logger = require("../../Util/logger");

class AuthController {
  // display register page
  ViewRegister(req, res) {
    res.sendFile(
      path.join(__dirname, "../../Resources/Views/Auth/register.html")
    );
  }

  // create user
  async register(req, res) {
    try {
      const { username, password, email, phone, surname } = req.body;

      // check data input
      if (!username || !password || !email || !phone || !surname) {
        logger.warn("Invalid data input");
        return res
          .status(400)
          .json({ message: "Vui lòng điền đầy đủ thông tin" });
      }

      // check email
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        logger.warn(`Email ${email} has been registered`);
        return res.status(400).json({ message: "Email này đã được đăng ký" });
      }

      // hash password
      console.log("Received request:", req.body);
      logger.info(`Start hashing password for ${email}`);
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Hashed password:", hashedPassword);

      // create new user
      const newUser = new User({
        username,
        password: hashedPassword,
        email,
        phone,
        surname,
      });

      // save user into database
      const savedUser = await newUser.save();
      console.log("User created:", savedUser);
      logger.info(`User ${email} has been created`);
      // log
      res.status(201).json({ message: "Đăng ký thành công!", user: savedUser });
    } catch (error) {
      logger.error("Error register", error.message);
      console.error("Error:", error);
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  }
}

module.exports = new AuthController();
