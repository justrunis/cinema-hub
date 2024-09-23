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
    console.error("Error fetching users:", error);
    next(error);
  }
};

exports.getUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    console.error("Error fetching user:", err);
    next(err);
  }
};

exports.updateUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { userId } = req.params;
    const { username, email, role } = req.body;
    const currentDateTime = new Date();

    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { username, email, role, updatedAt: currentDateTime },
      { new: true } // Returns the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (err) {
    console.error("Error updating user:", err);
    next(err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { userId } = req.params;

    // Run all deletions in parallel
    await Promise.all([
      Favorite.deleteMany({ user: userId }),
      Friend.deleteMany({ user: userId }),
      Friend.deleteMany({ friend: userId }),
      Watchlist.deleteMany({ user: userId }),
      TriviaAnswers.deleteMany({ user: userId }),
      User.findByIdAndDelete(userId),
    ]);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user and related data:", err);
    next(err);
  }
};
