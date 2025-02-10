document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registerForm");

  // Nếu không tìm thấy form, thoát khỏi script
  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    console.log("Submit form!");

    // Hiển thị hiệu ứng loading
    const loader = document.querySelector(".loader");
    if (loader) {
      loader.classList.add("active"); // Sử dụng class để kích hoạt loader
    }

    const formData = {
      surname: document.getElementById("surname").value,
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      password: document.getElementById("password").value,
      confirm_password: document.getElementById("confirm_password").value,
      remember: document.getElementById("remember").checked,
    };

    if (formData.password !== formData.confirm_password) {
      const loader = document.querySelector(".loader");
      if (loader) {
        loader.classList.add("active"); // Sử dụng class để kích hoạt loader
      }

      return alert("Mật khẩu không khớp");
    }

    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok) {
        window.location.href = "/";
      } else {
        console.log("Lỗi khi gửi yêu cầu", result);
      }
    } catch (error) {
      console.log("Lỗi khi gửi yêu cầu", error);
    } finally {
      const loader = document.querySelector(".loader");
      if (loader) {
        loader.classList.remove("active"); // Ẩn loader
      }
    }
  });
});
