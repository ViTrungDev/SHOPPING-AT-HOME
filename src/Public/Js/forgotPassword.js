document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("forgotForm");
  const email = document.getElementById("PhoneOrEmail");

  const error = document.createElement("div");
  error.style.color = "red";
  error.style.fontSize = "12px";
  error.style.display = "none";
  error.style.boxSizing = "border-box";
  email.parentNode.appendChild(error);

  form.addEventListener("submit", function (e) {
    console.log("Form submit event fired!");
    e.preventDefault();

    const emailInput = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailInput === "") {
      error.style.display = "block";
      error.textContent = "❌ Vui lòng nhập email";
    } else if (!emailRegex.test(emailInput)) {
      error.style.display = "block";
      error.textContent = "❌ Email không hợp lệ";
    } else {
      error.style.display = "none";
      console.log("Chuyển hướng...");
      window.location.href = "/auth/forgotOTP";
    }
  });
});
