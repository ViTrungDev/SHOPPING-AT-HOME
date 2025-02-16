document.addEventListener("DOMContentLoaded", function () {
  const loader = document.querySelector(".loader");

  const form = document.getElementById("LoginForm");
  if (!form) return;

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log("Submit login form!");

    if (loader) {
      loader.classList.add("active");
    }

    const getEmailOrPhone = document.getElementById("PhoneOrEmail");
    const getPassword = document.getElementById("inputPassword");

    if (getEmailOrPhone && getPassword) {
      const emailOrPhoneValue = getEmailOrPhone.value;
      const passwordValue = getPassword.value;

      console.log("Email or Phone:", emailOrPhoneValue);
      console.log("Password:", passwordValue);

      // Kiểm tra xem giá trị nhập vào là email hay số điện thoại
      const isEmail = emailOrPhoneValue.includes("@");
      const formData = {
        email: isEmail ? emailOrPhoneValue : "",
        phone: isEmail ? "" : emailOrPhoneValue,
        password: passwordValue,
      };

      try {
        console.log("Sending login request with formData:", formData);
        const response = await fetch("/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        if (response.ok) {
          // Lưu token và thông tin người dùng vào localStorage
          localStorage.setItem("accessToken", result.accessToken);
          localStorage.setItem("username", result.username);
          localStorage.setItem("email", result.email);
          console.log(
            "Login successful, token and user info saved to localStorage"
          );
          // Chuyển hướng người dùng đến trang chủ
          window.location.href = "/";
        } else {
          console.log("Login error:", result);
        }
      } catch (error) {
        console.log("Login request failed:", error);
      } finally {
        if (loader) {
          loader.classList.remove("active");
        }
      }
      console.log("formData:", formData);
    } else {
      console.error("One or more elements not found.");
    }
  });
});
