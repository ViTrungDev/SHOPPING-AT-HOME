const bcrypt = require("bcrypt");
const logger = require("../../../Util/logger");
const ResetPass = require("../../Model/User_data/ResetPass");
const User = require("../../Model/User_data/User");

class comfirmPassword {
  async comfirmPassword(req, res) {
    let { email, code, password } = req.body;
    const otp = code;
    try {
      logger.info(`Xác thực mật khẩu cho email ${email}`);

      // Kiểm tra email có tồn tại trong DB không
      const otpRecord = await ResetPass.findOne({ email });
      if (!otpRecord) {
        logger.warn(`Email ${email} không tồn tại`);
        return res.status(400).json({ message: "Email không tồn tại" });
      }

      // Kiểm tra OTP có bị hết hạn không
      if (otpRecord.expiresAt < new Date()) {
        logger.warn(`OTP cho email ${email} đã hết hạn`);
        await ResetPass.deleteOne({ email });
        return res.status(400).json({ message: "OTP đã hết hạn" });
      }

      // Kiểm tra dữ liệu OTP
      if (!otp || !otpRecord.code) {
        logger.warn(`Thiếu dữ liệu: OTP = ${otp}, OTP lưu = ${otpRecord.code}`);
        return res.status(400).json({ message: "OTP không hợp lệ" });
      }

      // So sánh OTP nhập vào với mã OTP đã lưu (đã mã hóa)
      const checkOTP = await bcrypt.compare(otp, otpRecord.code);
      if (!checkOTP) {
        logger.warn(`Mã OTP không chính xác`);
        return res.status(400).json({ message: "Mã OTP không chính xác" });
      }

      // Kiểm tra mật khẩu có hợp lệ không
      if (!password) {
        logger.warn("Mật khẩu không được để trống");
        return res.status(400).json({ message: "Mật khẩu không hợp lệ" });
      }

      // Hash mật khẩu mới
      const hashedPassword = await bcrypt.hash(password, 10);

      // Cập nhật mật khẩu mới cho user
      await User.findOneAndUpdate({ email }, { password: hashedPassword });
      logger.info(`Mật khẩu đã được thay đổi`);

      // Xóa OTP sau khi đổi mật khẩu thành công
      await ResetPass.deleteOne({ email });

      return res.status(200).json({ message: "Mật khẩu đã được thay đổi" });
    } catch (error) {
      console.log("Lỗi reset", error);
      logger.error(`Lỗi reset mật khẩu: ${error.message}`);
      return res.status(500).json({ message: "Lỗi khi reset mật khẩu" });
    }
  }
}

module.exports = new comfirmPassword();
