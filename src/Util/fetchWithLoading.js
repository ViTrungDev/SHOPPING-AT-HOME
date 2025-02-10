export async function fetchWithLoading(url, options) {
  const loading = document.querySelector(".loader");
  if (loading) loading.classList.add("active"); // Kiểm tra nếu loader tồn tại

  const startTime = Date.now();

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return { response, result };
  } catch (error) {
    console.error("Lỗi gửi request", error);
    alert("Lỗi kết nối đến server");
    return { response: null, result: null };
  } finally {
    const elapsedTime = Date.now() - startTime;
    const minDelay = 10000;
    const delay = Math.max(minDelay - elapsedTime, 0);

    setTimeout(() => {
      if (loading) loading.classList.remove("active");
    }, delay);
  }
}
