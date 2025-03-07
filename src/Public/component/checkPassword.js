document.addEventListener("DOMContentLoaded", function () {
  function togglePasswordVisibility() {
    document
      .querySelectorAll('input[type="checkbox"][id="showPassword"]')
      .forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
          const form = this.closest("form"); // Tìm form chứa checkbox
          if (!form) return;

          // Tìm tất cả input có type="password" hoặc "text" trong form đó
          const passwordFields = form.querySelectorAll(
            'input[type="password"], input[type="text"]'
          );
          const type = this.checked ? "text" : "password"; // Nếu check thì hiện, bỏ check thì ẩn lại

          passwordFields.forEach((input) => (input.type = type));
        });
      });
  }

  // Gọi hàm khi DOM đã tải xong
  togglePasswordVisibility();
});
