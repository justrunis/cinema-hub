const User = require("../models/user");
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");

exports.getUser = async (req, res) => {
  try {
    // Access the user object set by the auth middleware
    const userId = req.user.id;

    // Find the user in the database using the userId
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
