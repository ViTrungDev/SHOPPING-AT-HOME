// import { fetchWithLoading } from "../../Util/fetchWithLoading.js";
// const fetchWithLoading = require("../../Util/fetchWithLoading.js");
document
  .getElementById("registerForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const fromData = {
      surname: document.getElementById("surname").value,
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      password: document.getElementById("password").value,
      confirm_password: document.getElementById("confirm_password").value,
      remember: document.getElementById("remember").checked,
    };
    if (fromData.password !== fromData.confirm_password) {
      return alert("Mật khẩu không khớp");
    }
    const { response, result } = await fetchWithLoading("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fromData),
    });
    if (response.ok || "Đăng ký thành công") {
      console.log("Đăng ký thành công");
    } else {
      console.log("Lỗi khi gửi yêu cầu", result);
    }
  });
