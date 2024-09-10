const User = require("../models/user");
const Friend = require("../models/friend");

exports.getFriends = async (req, res) => {
  const userId = req.user._id;

  const friends = await Friend.find({ user: userId }).populate("friend");

  res.status(200).json(friends);
};

exports.getSuggestedFriends = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch all friends and pending friend requests
    const friendsAndPending = await Friend.find({
      user: userId,
      status: { $in: ["accepted", "pending"] },
    });

    // Get the IDs of the users who are friends or pending friends
    const excludedUserIds = friendsAndPending.map((friend) => friend.friend);

    // Add the current user ID to the exclusion list
    excludedUserIds.push(userId);

    // Find users who are not in the excludedUserIds list
    const suggestedFriends = await User.find({
      _id: { $nin: excludedUserIds },
    }).select("username createdAt");

    res.status(200).json(suggestedFriends);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching suggested friends.",
      error,
    });
  }
};

exports.getFriendsList = async (req, res) => {
  const userId = req.user.id;

  const friends = await Friend.find({
    user: userId,
    status: { $in: ["accepted"] },
  }).populate("friend");

  res.status(200).json(friends);
};

exports.getFriendsRequests = async (req, res) => {
  const userId = req.user.id;

  const friends = await Friend.find({
    friend: userId,
    status: "pending",
  }).populate("user");

  res.status(200).json(friends);
};

exports.addFriend = async (req, res) => {
  const userId = req.user.id;
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

exports.acceptFriendRequest = async (req, res) => {
  const userId = req.user.id;
  const friendId = req.params.id;

  const friend = await Friend.findOne({ user: friendId, friend: userId });

  if (!friend) {
    return res.status(404).json({ message: "Friend request not found." });
  }

  friend.status = "accepted";
  await friend.save();

  const reverseFriend = await Friend.findOne({
    user: userId,
    friend: friendId,
  });

  if (!reverseFriend) {
    const newFriend = new Friend({
      user: userId,
      friend: friendId,
      status: "accepted",
    });
    await newFriend.save();
  }

  res.status(200).json({ message: "Friend request accepted." });
};

exports.rejectFriendRequest = async (req, res) => {
  const userId = req.user.id;
  const friendId = req.params.id;

  const friend = await Friend.findOneAndDelete({
    friend: friendId,
    friend: userId,
  });

  if (!friend) {
    return res.status(404).json({ message: "Friend request not found." });
  }

  res.status(200).json({ message: "Friend request rejected." });
};

exports.deleteFriend = async (req, res) => {
  const userId = req.user.id;
  const friendId = req.params.id;

  const friend = await Friend.findOneAndDelete({
    user: userId,
    friend: friendId,
  });

  if (!friend) {
    return res.status(404).json({ message: "Friend not found." });
  }

  const otherFriend = await Friend.findOneAndDelete({
    user: friendId,
    friend: userId,
  });

  if (!otherFriend) {
    return res.status(404).json({ message: "Friend not found." });
  }

  res.status(200).json({ message: "Friend deleted from both sides." });
};
