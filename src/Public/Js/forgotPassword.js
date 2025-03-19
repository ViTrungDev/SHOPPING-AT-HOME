document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("forgotForm");
  const email = document.getElementById("PhoneOrEmail");

  if (!form || !email) {
    console.error("Không tìm thấy form hoặc input email");
    return;
  }

  const error = document.createElement("div");
  error.style.color = "red";
  error.style.fontSize = "12px";
  error.style.display = "none";
  error.style.boxSizing = "border-box";
  email.parentNode.appendChild(error);

  form.addEventListener("submit", async function (e) {
    console.log("Form submit event fired!");
    e.preventDefault();

    const emailInput = email.value.trim(); //  Lấy giá trị của input
    console.log("Email nhập vào:", emailInput);

    if (emailInput === "") {
      error.style.display = "block";
      error.textContent = "❌ Vui lòng nhập email";
      return;
    }

    // Lưu email vào localStorage
    localStorage.setItem("resetMail", emailInput);

    try {
      console.log("Gửi request đến server...");
      const response = await fetch("/auth/forgotOTP", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput }),
      });

      const data = await response.json();
      console.log("Response status:", response.status);
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(
          `Lỗi: ${response.status} - ${data.message || response.statusText}`
        );
      }

      console.log("Gửi OTP thành công!");
      window.location.href = "/auth/forgotOTP";
    } catch (error) {
      console.error("Lỗi khi gửi request:", error);
    }
  });
});
