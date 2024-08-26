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
