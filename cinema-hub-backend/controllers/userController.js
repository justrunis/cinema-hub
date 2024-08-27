const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  console.log("Request Body:", req.body);

  const { username, email, password, passwordRepeat } = req.body;

  if (!username || !email || !password || !passwordRepeat) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const role = "user";
  const saltRounds = 12;

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

  res.status(200).json({ message: "Login successful." });
};

exports.getUser = async (req, res) => {
  // Hardcoded user ID for demonstration purposes
  const user = await User.findOne({ _id: "66cc7aefd296c9e011e3bfe8" });
  res.status(200).json({ user });
};

exports.logoutUser = async (req, res) => {
  res.status(200).json({ message: "Logout successful." });
};
