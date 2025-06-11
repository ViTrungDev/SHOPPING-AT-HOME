document.querySelector('#forgotForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const otpInputs = document.querySelectorAll('.singleDigitInput');
    const messageContainer = document.querySelector('.forgot__form--input--otp'); // Chỗ chứa input OTP

    // Lấy hoặc tạo messageError
    let messageError = document.querySelector('.message-error');
    if (!messageError) {
        messageError = document.createElement('div');
        messageError.className = 'message-error';
        messageError.style.fontSize = '12px';
        messageError.style.color = 'red';
        messageError.style.display = 'none';
        messageError.style.width = '100%';
        messageError.style.marginBottom = '5px';
        messageContainer.insertAdjacentElement('afterend', messageError);
    }

    const enteredOtp = Array.from(otpInputs)
        .map((input) => input.value)
        .join('')
        .trim();
    const email = localStorage.getItem('resetMail');

    if (enteredOtp.length !== 6) {
        messageError.style.display = 'block';
        messageError.textContent = '❌ Mã OTP phải có 6 chữ số!';
        return;
    }

    try {
        const response = await fetch('/auth/forgotOTP/comfirm_password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, code: enteredOtp }),
        });

        const data = await response.json();
        console.log('Phản hồi từ server:', data);

        // XỬ LÝ KẾT QUẢ TỪ SERVER
        if (!response.ok) {
            messageError.style.display = 'block';
            messageError.textContent = `❌ ${data.message || 'Mã OTP không hợp lệ!'}`;
            return; // Dừng lại nếu OTP sai
        }

        // Nếu OTP hợp lệ, chuyển hướng trang
        window.location.href = '/auth/forgotOTP/comfirm_password';
    } catch (error) {
        console.error('Lỗi khi gửi request:', error);
        messageError.style.display = 'block';
        messageError.textContent = '❌ Có lỗi xảy ra, vui lòng thử lại!';
    }
});
