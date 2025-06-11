document.addEventListener('DOMContentLoaded', function () {
    const imageMethodSelect = document.getElementById('imageMethod');
    const descriptionMethodSelect = document.getElementById('descriptionMethod');
    const imageInputsDiv = document.getElementById('imageInputs');
    const addImageBtn = document.getElementById('addImageBtn');
    let imageCount = 1;

    // Toggle mô tả input vs upload
    descriptionMethodSelect.addEventListener('change', function () {
        const method = this.value;
        document.getElementById('descriptionInput').classList.toggle('hidden', method !== 'input');
        document.getElementById('descriptionUpload').classList.toggle('hidden', method !== 'upload');
    });

    // Thêm ảnh mới
    addImageBtn.addEventListener('click', function () {
        if (imageCount < 6) {
            imageCount++;
            const newImageInput = document.createElement('div');
            newImageInput.className = 'image-input';
            newImageInput.id = `imageInput${imageCount}`;
            newImageInput.innerHTML = `
                <label>Hình ảnh ${imageCount}:</label>
                <input type="file" name="imgFile" accept="image/*" class="imgFile">
                <div class="image-preview" id="preview${imageCount}"></div>
                <button type="button" class="removeImageBtn">Xoá</button>
            `;
            imageInputsDiv.appendChild(newImageInput);
        }
    });

    // Xoá ảnh
    imageInputsDiv.addEventListener('click', function (event) {
        if (event.target.classList.contains('removeImageBtn')) {
            const parent = event.target.closest('.image-input');
            parent.remove();
        }
    });

    // Xử lý thay đổi phương thức nhập ảnh
    imageMethodSelect.addEventListener('change', function () {
        const method = this.value;
        const imageInputs = document.querySelectorAll('.image-input');

        imageInputs.forEach((inputDiv) => {
            const imgInput = inputDiv.querySelector('input');
            const previewDiv = inputDiv.querySelector('.image-preview');
            imgInput.value = '';
            previewDiv.innerHTML = '';

            if (method === 'upload') {
                imgInput.type = 'file';
                imgInput.accept = 'image/*';
                imgInput.onchange = function () {
                    const file = this.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function (e) {
                            const img = document.createElement('img');
                            img.src = e.target.result;
                            previewDiv.innerHTML = '';
                            previewDiv.appendChild(img);
                        };
                        reader.readAsDataURL(file);
                    }
                };
            } else {
                imgInput.type = 'text';
                imgInput.placeholder = 'Nhập link hình ảnh';
                imgInput.oninput = function () {
                    previewDiv.innerHTML = '';
                    const img = document.createElement('img');
                    img.src = imgInput.value;
                    img.onload = () => {
                        previewDiv.innerHTML = '';
                        previewDiv.appendChild(img);
                    };
                    img.onerror = () => {
                        previewDiv.innerHTML = '<p style="color: red;">Link không hợp lệ</p>';
                    };
                };
            }
        });
    });

    // Submit form
    document.getElementById('productForm').addEventListener('submit', async function (event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData();

        const name = form.querySelector('[name="name"]').value;
        const price = form.querySelector('[name="price"]').value;
        const quantity = form.querySelector('[name="quantity"]').value;
        const category = form.querySelector('[name="category"]').value;
        const descriptionText = form.querySelector('[name="description"]').value;
        const imageMethod = imageMethodSelect.value;
        const descriptionMethod = descriptionMethodSelect.value;

        formData.append('name', name);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('category', category);
        formData.append('slug', '');

        if (descriptionMethod === 'input') {
            formData.append('description', descriptionText);
        }

        const imageInputs = form.querySelectorAll('.imgFile');
        let hasImage = false;
        for (const input of imageInputs) {
            if (imageMethod === 'link') {
                if (input.value.trim()) {
                    formData.append('images', input.value.trim());
                    hasImage = true;
                }
            } else {
                const file = input.files[0];
                if (file) {
                    formData.append('images', file);
                    hasImage = true;
                }
            }
        }

        if (!hasImage) {
            alert('Vui lòng thêm ít nhất một hình ảnh.');
            return;
        }

        if (descriptionMethod === 'upload') {
            const descFileInput = form.querySelector('#descriptionUpload input[type="file"]');
            if (descFileInput && descFileInput.files[0]) {
                formData.append('descriptionFile', descFileInput.files[0]);
            }
        }

        try {
            const response = await fetch('/products/create', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                alert('Sản phẩm đã được đăng thành công');
                window.location.href = '/Admin/Product/List';
            } else {
                alert('Đã có lỗi xảy ra.');
            }
        } catch (error) {
            alert('Không thể kết nối tới máy chủ.');
        }
    });
});
