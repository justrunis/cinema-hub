const User = require("../models/user");

exports.getUsers = async (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.getUser = async (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const { username, email, role } = req.body;
  const currentDateTime = new Date();
  User.findByIdAndUpdate(
    { _id: userId },
    { username, email, role, updatedAt: currentDateTime }
  )
    .then(res.status(200).json({ message: "User updated successfully" }))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.deleteUser = async (req, res) => {
  console.log(req.params);
  const { userId } = req.params;
  User.findByIdAndDelete(userId)
    .then(res.status(200).json({ message: "User deleted successfully" }))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
