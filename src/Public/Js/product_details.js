document.addEventListener("DOMContentLoaded", function () {
  const mainImg = document.getElementById("main_image");
  const thumbnailImgs = document.querySelectorAll(".Thumbnail");

  thumbnailImgs.forEach((thumbnailImg) => {
    thumbnailImg.addEventListener("click", function () {
      mainImg.src = this.getAttribute("data-src-large");
      thumbnailImgs.forEach((img) => {
        img.classList.remove("active");
      });
      this.classList.add("active");
    });
  });
  /*=============================================== Option ====================================================== */
  const btnOptions = document.querySelectorAll(".options_btn");

  btnOptions.forEach((btnOption) => {
    btnOption.addEventListener("click", function () {
      btnOptions.forEach((btn) => {
        btn.classList.remove("active");
      });
      this.classList.add("active");
    });
  });
  /*=============================================== Quantity ====================================================== */
  const inputQty = document.querySelector(".quantity input");
  const btnQuantityMinu = document.getElementById("quantity__btn--minus");
  const btnQuantityAdd = document.getElementById("quantity__btn--add");
  const valueMax = parseInt(inputQty.max);
  const valueMin = parseInt(inputQty.min);

  btnQuantityMinu.addEventListener("click", function () {
    if (inputQty.value > valueMin) {
      inputQty.value--;
    }
  });
  btnQuantityAdd.addEventListener("click", function () {
    if (inputQty.value < valueMax) {
      inputQty.value++;
    }
  });
});
