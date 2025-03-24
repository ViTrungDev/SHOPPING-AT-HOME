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

  /* ====================================== code phần slider sản phẩm (Best Deals) =================================*/
  //Xử lý slider sản phẩm (Best Deals)
  const slider = document.querySelector(".best-deals__grid");
  const prevBtn = document.querySelector(".slider-btn__left");
  const nextBtn = document.querySelector(".slider-btn__right");
  const onSaleSection = document.querySelector(".card__title");

  let autoSlideInterval;
  let isOnSaleVisible = false;

  //Kiểm tra người dùng đã cuộn đến phần "On Sale"
  function checkOnSaleVisibility() {
    const rect = onSaleSection.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  }

  // Auto slide khi cuộn đến phần On Sale
  function handleScroll() {
    if (checkOnSaleVisibility() && !isOnSaleVisible) {
      isOnSaleVisible = true;
      startAutoSlide();
    }
  }

  //Hàm trượt slider (trái -> phải như vòng lặp)
  function slideRight() {
    const firstItem = slider.firstElementChild;
    slider.appendChild(firstItem);
  }

  //Hàm trượt slider (phải -> trái như vòng lặp)
  function slideLeft() {
    const lastItem = slider.lastElementChild;
    slider.prepend(lastItem);
  }

  //Tự động trượt slider khi cuộn đến phần On Sale
  function startAutoSlide() {
    autoSlideInterval = setInterval(slideRight, 3000); // Tự động trượt mỗi s
  }

  // Thêm sự kiện click cho nút
  prevBtn.addEventListener("click", function () {
    clearInterval(autoSlideInterval);
    slideLeft();
    startAutoSlide();
  });

  nextBtn.addEventListener("click", function () {
    clearInterval(autoSlideInterval);
    slideRight();
    startAutoSlide();
  });

  // Lắng nghe sự kiện cuộn trang
  window.addEventListener("scroll", handleScroll);
});
