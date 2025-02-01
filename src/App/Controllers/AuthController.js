const bcrypt = require("bcrypt");
const User = require("../Model/User_data/User");
class AuthController {
  async register(req, res) {
    try {
      console.log("Received request:", req.body);
      const salt = await bcrypt.genSalt(10);
      const hasherPassword = await bcrypt.hash(req.body.password, salt);
      console.log("Hasher password:", hasherPassword);

      //   create new user
      const newUser = new User({
        username: req.body.username,
        password: hasherPassword,
        email: req.body.email,
        phone: req.body.phone,
        surname: req.body.surname,
      });
      console.log("New user:", newUser);
      //   save user
      const user = await newUser.save();
      console.log("User:", user);
      res.status(201).send(user);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();
