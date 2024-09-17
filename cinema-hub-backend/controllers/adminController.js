const User = require("../models/user");
const Favorite = require("../models/favorite");
const Friend = require("../models/friend");
const Watchlist = require("../models/watchlist");
const TriviaAnswers = require("../models/triviaAnswers");

exports.getUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Extract and parse page and limit from query parameters
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    // Calculate start and end index for pagination
    const startIndex = (page - 1) * limit;

    // Initialize result object
    const results = {};

    // Get total number of documents
    const totalCount = await User.countDocuments().exec();

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);

    // Fetch the paginated results
    results.results = await User.find().limit(limit).skip(startIndex).exec();

    // Set next page if there are more documents to fetch
    if (startIndex + limit < totalCount) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    // Set previous page if not on the first page
    if (page > 1) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    // Add total pages to the results
    results.totalPages = totalPages;

    // Send the paginated results as JSON response
    res.status(200).json(results);
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }
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
  if (req.user.role !== "admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }
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
  try {
    if (req.user.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { userId } = req.params;

    // Delete user's favorites
    await Favorite.deleteMany({ user: userId });

    // Delete user's friends (where the user is the requester)
    await Friend.deleteMany({ user: userId });

    // Delete user's friends (where the user is the recipient)
    await Friend.deleteMany({ friend: userId });

    // Delete user's watchlist
    await Watchlist.deleteMany({ user: userId });

    // Delete user's trivia answers
    await TriviaAnswers.deleteMany({ user: userId });

    // Finally, delete the user
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user and related data:", err);
    res.status(500).json({ error: "Server error. Could not delete user." });
  }
};
