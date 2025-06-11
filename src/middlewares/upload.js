const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Tạo thư mục lưu trữ nếu chưa tồn tại
const uploadDir = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

// Đảm bảo thư mục uploads/images và uploads/files đã tồn tại
uploadDir(path.join(__dirname, '../uploads/images'));
uploadDir(path.join(__dirname, '../uploads/files'));

// Cấu hình lưu trữ file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath = '';

        // Kiểm tra trường file và thiết lập đường dẫn lưu
        if (file.fieldname === 'images') {
            uploadPath = path.join(__dirname, '../uploads/images');
        } else if (file.fieldname === 'descriptionFile') {
            uploadPath = path.join(__dirname, '../uploads/files');
        }

        // Đảm bảo thư mục tồn tại trước khi lưu tệp
        uploadDir(uploadPath);

        cb(null, uploadPath); // Chuyển tiếp đường dẫn đúng cho multer
    },
    filename: function (req, file, cb) {
        // Tạo tên file duy nhất dựa trên timestamp
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName); // Đặt tên cho file
    },
});

// Bộ lọc file (chỉ cho phép định dạng ảnh và file mô tả hợp lệ)
const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'images') {
        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        cb(null, allowedImageTypes.includes(file.mimetype)); // Kiểm tra loại ảnh hợp lệ
    } else if (file.fieldname === 'descriptionFile') {
        const allowedDocTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];
        cb(null, allowedDocTypes.includes(file.mimetype)); // Kiểm tra loại file mô tả hợp lệ
    } else {
        cb(new Error('Invalid file type'), false); // Nếu không phải ảnh hay file mô tả thì từ chối
    }
};

// Cấu hình multer với các cài đặt đã cấu hình
const upload = multer({ storage, fileFilter });

module.exports = upload;
