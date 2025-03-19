document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("LoginForm");

  if (!form) return;

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log("Submit login form!");

    // if (loader) loader.classList.add("active");

    const getEmailOrPhone = document.getElementById("PhoneOrEmail");
    const getPassword = document.getElementById("inputPassword");

    if (!getEmailOrPhone || !getPassword) {
      console.error("Không tìm thấy input!");
      if (window.showNotification)
        showNotification("Lỗi hệ thống! Không tìm thấy input.", "error");
      return;
    }

    const emailOrPhoneValue = getEmailOrPhone.value.trim();
    const passwordValue = getPassword.value.trim();

    if (!emailOrPhoneValue || !passwordValue) {
      if (window.showNotification)
        showNotification("Vui lòng nhập đầy đủ thông tin!", "error");
      return;
    }

    const isEmail = emailOrPhoneValue.includes("@");
    const formData = {
      email: isEmail ? emailOrPhoneValue : "",
      phone: isEmail ? "" : emailOrPhoneValue,
      password: passwordValue,
    };

    try {
      console.log("Gửi request đăng nhập với:", formData);

      const response = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();

      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("username", result.username);
      localStorage.setItem("email", result.email);
      localStorage.setItem("isAdmin", result.isAdmin);

      console.log("Đăng nhập thành công!");
      if (window.showNotification)
        showNotification("Đăng nhập thành công!", "success");

      setTimeout(() => {
        window.location.href = result.isAdmin ? "/Auth/admin" : "/";
      }, 1500);
    } catch (error) {
      console.error("Lỗi request:", error);
      if (window.showNotification)
        showNotification("Lỗi đăng nhập! Vui lòng thử lại.", "error");
    }
  });
});
