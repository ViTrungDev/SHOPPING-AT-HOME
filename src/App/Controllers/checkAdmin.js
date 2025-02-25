const jwt = require("jsonwebtoken");
module.exports = {
  authenticateToken: (req, res, next) => {
    console.log("📌 Headers nhận được:", req.headers);
    console.log("📌 Cookies nhận được:", req.cookies);

    let token = req.headers.authorization?.split(" ")[1]; // Lấy token từ Headers

    if (!token && req.cookies?.token) {
      token = req.cookies.token; // Lấy token từ Cookies nếu có
    }

    if (!token) {
      console.log("❌ Không tìm thấy token!");
      return res.status(401).json({ message: "Bạn chưa đăng nhập!" });
    }
    // verify token
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        console.error("❌ Token không hợp lệ:", err.message);
        return res
          .status(403)
          .json({ message: "Token không hợp lệ hoặc đã hết hạn!" });
      }
      console.log("✅ Token hợp lệ, user:", user);
      req.user = user;
      next();
    });
  },

  checkAdmin: (req, res, next) => {
    console.log("📌 Kiểm tra quyền admin, user:", req.user);

    // 🛠 **Sửa lỗi kiểm tra sai key**
    if (!req.user || req.user.admin !== true) {
      console.log(
        `❌ Người dùng không phải là admin! (admin = ${req.user.admin})`
      );
      return res.status(403).json({ message: "Bạn không có quyền truy cập!" });
    }

    console.log("✅ Người dùng là admin!");
    next();
  },
};
