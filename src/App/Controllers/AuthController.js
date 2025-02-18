const bcrypt = require("bcrypt");
const User = require("../Model/User_data/User");
const path = require("path");
const logger = require("../../Util/logger");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendMail = require("../../helper/sendMail");
const fs = require("fs").promises;

class AuthController {
  // display register page
  ViewRegister(req, res) {
    res.sendFile(
      path.join(__dirname, "../../Resources/Views/Auth/register.html")
    );
  }
  // display login page
  ViewLogin(req, res) {
    res.sendFile(path.join(__dirname, "../../Resources/Views/Auth/login.html"));
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

      // Tạo username mới với số ngẫu nhiên
      let newUsername = username + generateRandomNumber();
      while (await User.findOne({ username: newUsername })) {
        newUsername = username + generateRandomNumber();
      }
      function generateRandomNumber() {
        return Math.floor(Math.random() * 9000) + 1000;
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
      logger.info(`User ${email} has been created with usernamenewUsername}`);

      // Read the HTML file content
      const emailHtml = await fs.readFile(
        path.join(__dirname, "../../Resources/Views/Emails/sendEmail.html"),
        "utf-8"
      );

      res.status(201).json({
        message: "Đăng ký thành công!",
        user: savedUser,
      });
      await sendMail({
        email: email,
        subject: "Bạn đã đăng ký thành công tài khoản tại Shopping at home",
        html: emailHtml, // Use the content of sendEmail.html
      });
    } catch (error) {
      logger.error("Error register", error.message);
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  }

  /* =====================================login==================================*/
  async login(req, res) {
    try {
      let { email, phone, password } = req.body;
      // check data input
      if (!email && !phone) {
        logger.warn("Invalid data input");
        return res
          .status(400)
          .json({ message: "Vui lòng điền email hoặc số điện thoại" });
      }
      // check password
      if (!password) {
        return res.status(400).json({ message: " Vui lòng nhập password" });
      }
      // search user by email or phone
      const user = await User.findOne({
        $or: [{ phone: phone }, { email: email }],
      });
      if (!user) {
        logger.warn("User not found");
        return res.status(404).json({ message: "User not found" });
      }
      // check password
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        logger.warn("Password is incorrect");
        return res.status(400).json({ message: "Password is incorrect" });
      }
      // create access token
      const accessToken = jwt.sign(
        { userId: user._id, admin: user.isAdmin },
        process.env.TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      // Set cookie with the token
      res.cookie("token", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      // Return the token in the response
      res.status(200).json({
        message: "Đăng nhập thành công!",
        accessToken,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      });

      // Log email and username on successful login
      logger.info(
        `Login successful for user: ${user.email}, username: ${user.username}`
      );
    } catch (error) {
      logger.error("Error login", error.message);
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  }
}

module.exports = new AuthController();
