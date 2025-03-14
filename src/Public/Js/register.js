import { showNotification } from "../component/SharedNotification";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registerForm");

  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    console.log("Submit form đăng ký!");

    const loader = document.querySelector(".loader");
    if (loader) loader.classList.add("active");

    const formData = {
      surname: document.getElementById("surname").value.trim(),
      username: document.getElementById("username").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      password: document.getElementById("password").value.trim(),
      confirm_password: document
        .getElementById("confirm_password")
        .value.trim(),
    };

    // Kiểm tra nhập đầy đủ thông tin
    if (
      !formData.surname ||
      !formData.username ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirm_password
    ) {
      showNotification("Vui lòng nhập đầy đủ thông tin!", "red");
      if (loader) loader.classList.remove("active");
      return;
    }

    // Kiểm tra mật khẩu trùng khớp
    if (formData.password !== formData.confirm_password) {
      showNotification("Mật khẩu không khớp!", "red");
      if (loader) loader.classList.remove("active");
      return;
    }

    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Đăng ký thành công!");
        showNotification("Đăng ký thành công! Chuyển hướng...", "green");

        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 1500);
      } else {
        console.log("Lỗi khi đăng ký:", result);
        showNotification(result.message || "Đăng ký thất bại!", "red");
      }
    } catch (error) {
      console.error("Lỗi kết nối server:", error);
      showNotification("Lỗi kết nối đến server!", "gray");
    } finally {
      if (loader) loader.classList.remove("active");
    }
  });
});
