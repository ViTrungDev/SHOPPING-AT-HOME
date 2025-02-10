const bcrypt = require("bcrypt");
const User = require("../Model/User_data/User");
const path = require("path");
const logger = require("../../Util/logger");
const crypto = require("crypto");

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
      let { username, password, email, phone, surname } = req.body;

      // check data input
      if (!username || !password || !email || !phone || !surname) {
        logger.warn("Invalid data input");
        return res
          .status(400)
          .json({ message: "Vui lòng điền đầy đủ thông tin" });
      }

      // check email
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        logger.warn(`Email ${email} has been registered`);
        return res.status(400).json({ message: "Email này đã được đăng ký" });
      }

      // Tạo username mới nếu bị trùng
      let newUsername = username;
      while (await User.findOne({ username: newUsername })) {
        // Tạo số ngẫu nhiên từ 1000 đến 9999
        const randomNumber = crypto.randomInt(1000, 9999);
        newUsername = `${username}${randomNumber}`;
      }

      // hash password
      logger.info(`Start hashing password for ${email}`);
      const hashedPassword = await bcrypt.hash(password, 10);

      // create new user
      const newUser = new User({
        username: newUsername, // dùng username mới đã sửa
        password: hashedPassword,
        email,
        phone,
        surname,
      });

      // save user into database
      const savedUser = await newUser.save();
      logger.info(
        `User ${email} has been created with username ${newUsername}`
      );

      res.status(201).json({
        message: "Đăng ký thành công!",
        user: savedUser,
      });
    } catch (error) {
      logger.error("Error register", error.message);
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  }
}

module.exports = new AuthController();
