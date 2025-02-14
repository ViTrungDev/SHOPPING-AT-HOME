const nodemailer = require("nodemailer");

const sendMail = async ({ email, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "Gmail",
    auth: {
      user: process.env.Email_user,
      pass: process.env.passEmail,
    },
  });
  const message = {
    from: "Shopping at home",
    to: email,
    subject: subject,
    html: html,
  };
  const result = await transporter.sendMail(message);
  return result;
};
module.exports = sendMail;
