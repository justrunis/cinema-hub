const User = require("../models/user");
const bcrypt = require("bcrypt");
const auth = require("../auth/auth");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const saltRounds = 12;
const tokenExpiryTime = "7d";

exports.createUser = async (req, res) => {
  const { username, email, password, passwordRepeat } = req.body;

  if (!username || !email || !password || !passwordRepeat) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const role = "user";

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Check if a user with the same username or email already exists
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "Username or email already exists." });
  }

  // Check if the password and passwordRepeat match
  if (password !== passwordRepeat) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  // Create the new user
  const newUser = new User({ username, email, password: hashedPassword, role });
  await newUser.save();

  res.status(201).json({ message: "User created successfully." });
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = await User.findOne({ username });

  // Check if the user exists
  if (!user) {
    return res.status(400).json({ message: "Invalid username or password." });
  }

  // Check if the password is correct
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(400).json({ message: "Invalid username or password." });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: tokenExpiryTime }
  );

  res.status(200).json({ message: "Login successful.", token });
};

exports.forgotPassword = async (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found." });
  }

  const passwordResetToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  user.resetToken = passwordResetToken;
  user.resetTokenExpiration = Date.now() + 3600000; // 1 hour

  await user.save();

  // Send the password reset token to the user's email address later
  console.log("Password reset token:", passwordResetToken);

  res.status(200).json({ message: "Password reset token sent." });
};

exports.resetPassword = async (req, res) => {
  const { token, password, passwordRepeat } = req.body;
  console.log(req.body);

  if (!token || !password || !passwordRepeat) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (password !== passwordRepeat) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decodedToken.id);

  if (!user) {
    return res.status(400).json({ message: "User not found." });
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  user.password = hashedPassword;
  user.resetToken = null;
  user.resetTokenExpiration = null;

  await user.save();

  res.status(200).json({ message: "Password reset successful." });
};

exports.logoutUser = async (req, res) => {
  res.status(200).json({ message: "Logout successful." });
};
