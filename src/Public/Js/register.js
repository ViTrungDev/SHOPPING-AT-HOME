document
  .getElementById("registerForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get data register form
    const fromData = {
      surname: document.getElementById("surname").value,
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      password: document.getElementById("password").value,
      confirm_password: document.getElementById("confirm_password").value,
      remember: document.getElementById("remember").checked,
    };
    // Check password
    if (fromData.password !== fromData.confirm_password) {
      return alert("Mật khẩu không khớp");
    }
    // Send data to server
    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fromData),
      });
      const result = await response.json();
      if (response.ok || "Đăng ký thành công") {
        window.location.href = "/";
      }
    } catch (error) {
      console.log("Lỗi khi gửi yêu cầu", error);
    }
  });
