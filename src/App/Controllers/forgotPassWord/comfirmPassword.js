const bcrypt = require("bcrypt");
const logger = require("../../../Util/logger");
const ResetPass = require("../../Model/User_data/ResetPass");
const User = require("../../Model/User_data/User");

class PasswordController {
  async verifyOTP(req, res) {
    const { email, code } = req.body;
    console.log("Dữ liệu nhận từ client:", req.body);

    try {
      logger.info(`Xác thực OTP cho email ${email}`);

      // Kiểm tra email có tồn tại không
      const otpRecord = await ResetPass.findOne({ email });
      if (!otpRecord) {
        logger.warn(`Email ${email} không tồn tại hoặc OTP đã hết hạn`);
        return res
          .status(400)
          .json({ message: "Email không tồn tại hoặc OTP đã hết hạn!" });
      }

      // Kiểm tra OTP có bị hết hạn không
      if (otpRecord.expiresAt < new Date()) {
        logger.warn(`OTP cho email ${email} đã hết hạn`);
        await ResetPass.deleteOne({ email });
        return res.status(400).json({ message: "OTP đã hết hạn" });
      }

      // Kiểm tra nếu mã OTP bị thiếu
      if (!code) {
        logger.warn(`Thiếu dữ liệu: OTP nhập = ${code}`);
        return res.status(400).json({ message: "OTP không hợp lệ" });
      }

      // Kiểm tra mã OTP nhập vào có khớp với mã đã lưu trong database
      const isMatch = await bcrypt.compare(code, otpRecord.code);
      if (!isMatch) {
        logger.warn(`Mã OTP không chính xác`);
        return res.status(400).json({ message: "Mã OTP không chính xác" });
      }

      // Cập nhật trạng thái verified = true và trả về dữ liệu mới nhất
      const updatedRecord = await ResetPass.findOneAndUpdate(
        { email },
        { verified: true },
        { new: true } // Trả về bản ghi mới nhất sau khi cập nhật
      );

      if (!updatedRecord.verified) {
        logger.warn(`Cập nhật verified thất bại`);
        return res.status(500).json({ message: "Không thể xác thực OTP!" });
      }

      // Nếu OTP hợp lệ, gửi thông báo để nhập mật khẩu mới
      return res
        .status(200)
        .json({ message: "OTP hợp lệ, hãy nhập mật khẩu mới!" });
    } catch (error) {
      console.error("Lỗi xác thực OTP:", error);
      logger.error(`Lỗi xác thực OTP: ${error.message}`);
      return res.status(500).json({ message: "Lỗi khi xác thực OTP" });
    }
  }

  async updatePassword(req, res) {
    const { email, password } = req.body;
    console.log("Dữ liệu nhận từ front end", req.body);
    try {
      logger.info(`Cập nhật mật khẩu cho email ${email}`);

      // Kiểm tra mật khẩu hợp lệ
      if (!password || password.length < 6) {
        logger.warn("Mật khẩu không hợp lệ");
        return res
          .status(400)
          .json({ message: "Mật khẩu phải có ít nhất 6 ký tự" });
      }

      // Kiểm tra trạng thái xác thực OTP
      const otpRecord = await ResetPass.findOne({ email });
      console.log("📌 Kiểm tra dữ liệu trong DB:", otpRecord);
      if (!otpRecord || !otpRecord.verified) {
        logger.warn(`Người dùng ${email} chưa xác thực OTP`);
        return res
          .status(400)
          .json({ message: "Bạn chưa xác thực OTP hoặc OTP đã hết hạn" });
      }
      if (!otpRecord.verified) {
        logger.warn(
          `Người dùng ${email} chưa xác thực OTP, giá trị verified: ${otpRecord.verified}`
        );
        return res
          .status(400)
          .json({ message: "Bạn chưa xác thực OTP! Vui lòng kiểm tra lại" });
      }
      // Tìm user trong database
      const user = await User.findOne({ email });
      if (!user) {
        logger.warn(`Không tìm thấy người dùng với email ${email}`);
        return res.status(400).json({ message: "Email không tồn tại" });
      }

      // So sánh mật khẩu mới với mật khẩu cũ
      const isSamePassword = await bcrypt.compare(password, user.password);
      if (isSamePassword) {
        logger.warn(`Người dùng ${email} nhập mật khẩu trùng với mật khẩu cũ`);
        return res
          .status(400)
          .json({ message: "Mật khẩu mới không được trùng với mật khẩu cũ" });
      }

      // Hash mật khẩu mới
      const hashedPassword = await bcrypt.hash(password, 10);

      // Cập nhật mật khẩu mới cho user
      await User.findOneAndUpdate({ email }, { password: hashedPassword });
      logger.info(`Mật khẩu đã được thay đổi thành công`);

      // Xóa OTP sau khi đổi mật khẩu thành công
      await ResetPass.deleteOne({ email });

      return res
        .status(200)
        .json({ message: "Mật khẩu đã được cập nhật thành công" });
    } catch (error) {
      console.error("Lỗi cập nhật mật khẩu:", error);
      logger.error(`Lỗi cập nhật mật khẩu: ${error.message}`);
      return res.status(500).json({ message: "Lỗi khi cập nhật mật khẩu" });
    }
  }
}

module.exports = new PasswordController();
