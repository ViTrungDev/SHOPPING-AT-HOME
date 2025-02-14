const jwt = require("jsonwebtoken");

const checkAdmin = {
  authenticateToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid!!!");
        }
        console.log("Decoded user from token:", user);
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You are not authenticated!");
    }
  },
  verifyTokenAuthAdminAuth: (req, res, next) => {
    const userId = req.user._id;
    const isAdmin = req.user.isAdmin;
    const paramId = req.params.id; // Assuming paramId is obtained from request parameters

    console.log("User id:", userId, "paramId:", paramId, "isAdmin:", isAdmin);
    if (String(userId) === String(paramId) || isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not allowed to access!");
    }
  },
};

module.exports = checkAdmin;
