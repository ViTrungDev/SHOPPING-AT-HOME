document.addEventListener("DOMContentLoaded", function () {
  const loader = document.querySelector(".loader");
  const form = document.getElementById("LoginForm");
  if (!form) return;

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log("Submit login form!");

    if (loader) loader.classList.add("active");

    const getEmailOrPhone = document.getElementById("PhoneOrEmail");
    const getPassword = document.getElementById("inputPassword");

    if (getEmailOrPhone && getPassword) {
      const emailOrPhoneValue = getEmailOrPhone.value;
      const passwordValue = getPassword.value;

      const isEmail = emailOrPhoneValue.includes("@");
      const formData = {
        email: isEmail ? emailOrPhoneValue : "",
        phone: isEmail ? "" : emailOrPhoneValue,
        password: passwordValue,
      };

      try {
        console.log("🔹 Gửi request đăng nhập với:", formData);
        const response = await fetch("/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (response.ok) {
          // Lưu token vào localStorage
          localStorage.setItem("accessToken", result.accessToken);
          localStorage.setItem("username", result.username);
          localStorage.setItem("email", result.email);
          localStorage.setItem("isAdmin", result.isAdmin);

          console.log("✅ Đăng nhập thành công, token đã lưu!");

          // Chuyển hướng
          window.location.href = result.isAdmin ? "/Auth/admin" : "/";
        } else {
          console.log("❌ Lỗi đăng nhập:", result);
        }
      } catch (error) {
        console.log("❌ Lỗi request:", error);
      } finally {
        if (loader) loader.classList.remove("active");
      }
    } else {
      console.error("❌ Không tìm thấy input!");
    }
  });
});

// Gửi request có token
async function fetchWithToken(url, method = "GET", body = null) {
  const token = localStorage.getItem("accessToken");
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(url, options);
  return response.json();
}
