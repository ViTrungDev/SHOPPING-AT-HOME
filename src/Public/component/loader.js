document.addEventListener("DOMContentLoaded", function () {
  let loader = document.querySelector(".loader");

  // Xử lý khi nhấn submit form
  let forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Ngăn chặn load lại trang
      showLoader();

      // Giả lập xử lý 3 giây, sau đó ẩn loader
      setTimeout(hideLoader, 3000);
    });
  });

  // Xử lý khi click vào thẻ <a>
  let links = document.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      let href = link.getAttribute("href");

      // Chỉ hiển thị loader nếu link không dẫn đến `#` hoặc `javascript:void(0)`
      if (href && href !== "#" && !href.startsWith("javascript")) {
        e.preventDefault(); // Ngăn chặn load trang ngay lập tức
        showLoader();

        // Giả lập xử lý 2 giây rồi chuyển trang
        setTimeout(() => {
          window.location.href = href;
        }, 2000);
      }
    });
  });

  // Hàm hiển thị loader
  function showLoader() {
    if (loader) {
      loader.classList.add("active");
    }
  }

  // Hàm ẩn loader
  function hideLoader() {
    if (loader) {
      loader.classList.remove("active");
    }
  }
});
