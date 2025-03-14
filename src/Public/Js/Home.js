document.addEventListener("DOMContentLoaded", function () {
  // Xử lý sự kiện click cho category-item
  var items = document.querySelectorAll(".category-item");
  items.forEach(function (item) {
    item.addEventListener("click", function () {
      items.forEach(function (el) {
        el.classList.remove("active");
      });
      item.classList.add("active");
    });
  });

  // Xử lý slider
  let slideIndex = 0;
  const slides = document.querySelectorAll(".ShowSlider");
  const slideDuration = 3000; // 3 giây mỗi ảnh
  const transitionDuration = 1000; // 1 giây chuyển đổi

  function showSlides() {
    slides.forEach((slide) => slide.classList.remove("active", "prev"));

    let currentSlide = slides[slideIndex];
    let prevSlide = slides[(slideIndex - 1 + slides.length) % slides.length];

    currentSlide.classList.add("active");
    prevSlide.classList.add("prev"); // Ẩn về bên trái

    slideIndex = (slideIndex + 1) % slides.length;
  }

  showSlides(); // Hiển thị ảnh đầu tiên
  setInterval(showSlides, slideDuration);
});
