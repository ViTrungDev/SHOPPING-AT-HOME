// Lấy token từ localStorage
const token = localStorage.getItem("accessToken");

// Gửi yêu cầu đến tuyến đường /profile với token trong tiêu đề
fetch("/profile", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.text();
  })
  .then((data) => {
    document.documentElement.innerHTML = data;
  })
  .catch((error) => {
    console.error("Error:", error);
  });
