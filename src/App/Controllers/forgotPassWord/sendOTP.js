const logger = require("../../../Util/logger");
const User = require("../../Model/User_data/User");
const bcrypt = require("bcrypt");
const ResetPass = require("../../Model/User_data/ResetPass");
const fs = require("fs").promises;
const path = require("path");
const sendMail = require("../../../helper/sendMail");

class SendOTP {
  constructor() {
    this.sendOTP = this.sendOTP.bind(this); // 🔹 Giữ ngữ cảnh của `this`
  }

  //  Tạo mã OTP gồm 6 chữ số
  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  //  Gửi OTP qua email
  async sendOTP(req, res) {
    try {
      const { email } = req.body;
      logger.info(`Gửi mã OTP đến email ${email}`);

      //  Kiểm tra xem email có tồn tại không
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ message: "Email không tồn tại" });

      //  Tạo OTP và mã hóa nó
      const otpCode = this.generateOTP();
      const hashedOTP = await bcrypt.hash(otpCode.toString(), 10);

      //  Xóa OTP cũ của email này (nếu có)
      await ResetPass.deleteOne({ email });

      //  Lưu OTP mới vào database, thời gian hết hạn = hiện tại + 1 phút
      await ResetPass.create({
        email,
        code: hashedOTP,
        expiresAt: new Date(Date.now() + 60 * 3000),
      });

      //  Đọc nội dung email từ file HTML
      let emailHtml = await fs.readFile(
        path.join(
          __dirname,
          "../../../Resources/Views/Emails/resetPassword.html"
        ),
        "utf-8"
      );

      //  Thay thế nội dung {{otp}} và {{username}}
      emailHtml = emailHtml.replace("{{otp}}", otpCode);
      emailHtml = emailHtml.replace("{{username}}", user.username);

      //  Gửi email
      try {
        await sendMail({
          email: email,
          subject: "Mã xác nhận khôi phục mật khẩu",
          html: emailHtml,
        });

        logger.info(`Đã gửi mã OTP đến email ${email}`);
        res.json({ message: "Mã OTP đã được gửi qua email!" });
      } catch (error) {
        logger.error(`Lỗi gửi OTP: ${error.message}`);
        res.status(500).json({ message: "Lỗi khi gửi email" });
      }
    } catch (error) {
      logger.error(`Lỗi gửi OTP: ${error.message}`);
      res.status(500).json({ message: "Lỗi khi gửi email" });
    }
  }
}

module.exports = new SendOTP();
