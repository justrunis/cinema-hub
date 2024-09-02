const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }

    console.log("Token received:", token); // Add this for debugging

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decodedToken); // Add this for debugging

    req.user = decodedToken;
    next();
  } catch (error) {
    console.log("Verification Error:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
