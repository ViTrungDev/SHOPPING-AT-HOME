document.addEventListener("DOMContentLoaded", function () {
  var items = document.querySelectorAll(".category-item");
  items.forEach(function (item) {
    item.addEventListener("click", function () {
      items.forEach(function (el) {
        el.classList.remove("active");
      });
      item.classList.add("active");
    });
  });
  //   show slider
  let sliderIndex = 0;
  function showSlider() {
    let i;
    let sliders = document.querySelectorAll(".ShowSlider");
    for (i = 0; i < sliders.length; i++) {
      sliders[i].style.display = "none";
      sliders[i].classList.remove("active");
    }
    sliderIndex++;
    if (sliderIndex > sliders.length) {
      sliderIndex = 1;
    }
    sliders[sliderIndex - 1].style.display = "block";
    sliders[sliderIndex - 1].classList.add("active");
  }
  setInterval(showSlider, 2000);
});
