document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("confirmPasswordForm");
  const newPass = document.getElementById("newPassword");
  const messageContainerError = document.getElementById("confirmPassword");
  if (!form || !newPass) {
    return;
  }
  let messageError = document.querySelector(".message-error");
  if (!messageError) {
    messageError = document.createElement("div");
    messageError.className = "message-error_pass";
    messageError.style.fontSize = "12px";
    messageError.style.color = "red";
    messageError.style.display = "none";
    messageError.style.width = "100%";
    messageError.style.marginTop = "10px";
    messageError.style.marginLeft = "10px";
    messageContainerError.insertAdjacentElement("afterend", messageError);
  }
  form.addEventListener("submit", async function (e) {
    console.log("form sumbmit event fired!");
    e.preventDefault();
    const InputnewPass = newPass.value.trim();
    const email = localStorage.getItem("resetMail");
    console.log(InputnewPass);
    if (InputnewPass.length < 6) {
      messageError.style.display = "block";
      messageError.textContent = "❌ Mật khẩu không được ít hơn 6 ký tự!";
    }
    const InputComfirmPass = messageContainerError.value.trim();
    if (InputnewPass === InputComfirmPass) {
      const response = await fetch(
        "/auth/forgotOTP/comfirm_password/updat_password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password: InputnewPass }),
        }
      );
      const data = await response.json();
      console.log("response", data);
      if (window.showNotification) {
        showNotification("Đổi mật khẩu thành công!");
        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 3000);
      }
    } else {
      messageError.style.display = "block";
      messageError.textContent = "❌ Mật khẩu không trùng khớp!";
      return;
    }
  });
});
