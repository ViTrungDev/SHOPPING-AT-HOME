const express = require("express");
const router = express.Router();

const authController = require("../App/Controllers/AuthController");
const checkAdmin = require("../App/Controllers/checkAdmin");
const Admin = require("../App/Controllers/Admin/adminController");
const profile = require("../App/Controllers/profile_user/profile_persion.js");

// 📌 Đăng ký
router.post("/register", authController.register);
router.get("/register", authController.ViewRegister);

// 📌 Đăng nhập
router.get("/login", authController.ViewLogin);
router.post("/login", authController.login);

// 📌 Profile cá nhân (Chỉ user đã đăng nhập mới truy cập được)
router.get("/profile", checkAdmin.authenticateToken, profile.index);

// 📌 Route Admin (Chỉ Admin mới truy cập được)
router.get(
  "/admin",
  checkAdmin.authenticateToken, // Xác thực token trước
  checkAdmin.checkAdmin, // Kiểm tra quyền admin
  Admin.index
);

module.exports = router;
