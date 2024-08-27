const User = require("../models/user");
const Friend = require("../models/friend");

exports.getFriends = async (req, res) => {
  const userId = req.user._id;

  const friends = await Friend.find({ user: userId }).populate("friend");

  res.status(200).json(friends);
};

exports.addFriend = async (req, res) => {
  const userId = req.user._id;
  const { friendId } = req.body;

  const existingFriend = await Friend.findOne({
    user: userId,
    friend: friendId,
  });

  if (existingFriend) {
    return res.status(400).json({ message: "Friend already added." });
  }

  const newFriend = new Friend({ user: userId, friend: friendId });
  await newFriend.save();

  res.status(201).json({ message: "Friend added." });
};

exports.deleteFriend = async (req, res) => {
  const userId = req.user._id;
  const friendId = req.params.id;

  const friend = await Friend.findOne({ _id: friendId, user: userId });

  if (!friend) {
    return res.status(404).json({ message: "Friend not found." });
  }

  await friend.remove();

  res.status(200).json({ message: "Friend deleted." });
};
