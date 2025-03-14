function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.classList.add("notification");

  notification.innerHTML = `
    ${message}
    <div class="progress-bar">
      <div class="progress ${type}"></div>
    </div>
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = "1";
    notification.style.transform = "translateX(0)";
    notification.querySelector(".progress").style.width = "0%"; // Thanh trượt thu nhỏ
  }, 10);

  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateX(100%)";
    setTimeout(() => notification.remove(), 300);
  }, 1500);
}
