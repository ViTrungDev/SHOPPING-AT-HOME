document.addEventListener("DOMContentLoaded", function () {
  fetch("/Acssets/favicon.html")
    .then((response) => response.text())
    .then((data) => {
      document.head.insertAdjacentHTML("beforeend", data);
    })
    .catch((error) => console.error("Lỗi tải favicon:", error));
});
