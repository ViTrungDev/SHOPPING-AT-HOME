const path = require("path");
const fs = require("fs").promises;

class forgotPassWordController {
  // display forgot password page
  ViewForgot(req, res) {
    res.sendFile(
      path.join(__dirname, "../../../Resources/Views/Auth/forgot.html")
    );
  }
  ViewOTP(req, res) {
    res.sendFile(
      path.join(__dirname, "../../../Resources/Views/Auth/forgotOTP.html")
    );
  }
  ComfirmOTP(req, res) {
    res.sendFile(
      path.join(__dirname, "../../../Resources/Views/Auth/comfirmPassword.html")
    );
  }
  ComfirmPassword(req, res) {
    res.sendFile(
      path.join(__dirname, "../../../Resources/Views/Auth/comfirmPassword.html")
    );
  }
}
module.exports = new forgotPassWordController();
