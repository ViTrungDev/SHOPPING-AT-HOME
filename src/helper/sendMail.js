const nodemailer = require('nodemailer');
const logger = require('../Util/logger');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Dùng TLS thay vì SSL
    auth: {
        user: process.env.Email_user,
        pass: process.env.passEmail,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

const sendMail = async ({ email, subject, html }) => {
    try {
        logger.info(`📩 Đang gửi email đến: ${email}`);

        const message = {
            from: process.env.Email_user,
            to: email,
            subject: subject,
            html: html,
        };

        const result = await transporter.sendMail(message);
        logger.info(`✅ Email đã gửi thành công đến ${email}`);
        return result;
    } catch (error) {
        logger.error(`❌ Lỗi khi gửi email đến ${email}: ${error.message}`);
        throw new Error('Gửi email thất bại!'); // Ném lỗi để xử lý ở chỗ gọi hàm
    }
};

module.exports = sendMail;
