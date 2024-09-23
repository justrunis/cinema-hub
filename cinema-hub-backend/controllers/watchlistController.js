const User = require("../models/user");
const Watchlist = require("../models/watchlist");

exports.getWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const watchlist = await Watchlist.find({ user: userId });

    res.status(200).json(watchlist);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.addWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      itemId,
      itemType,
      name,
      title,
      original_name,
      poster_path,
      vote_average,
    } = req.body;

    const newWatchlist = new Watchlist({
      user: userId,
      itemId,
      itemType,
      name: name || title || "Unknown",
      original_name: original_name || title || "Unknown",
      poster_path,
      vote_average,
    });

    await newWatchlist.save();

    res.status(201).json({ message: "Item added to watchlist." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.isInWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.params.id;

    const watchlist = await Watchlist.findOne({ user: userId, itemId: itemId });

    if (watchlist) {
      return res.status(200).json({ isInWatchlist: true });
    }

    res.status(200).json({ isInWatchlist: false });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const watchlistId = req.params.id;

    const watchlist = await Watchlist.findOneAndDelete({
      user: userId,
      itemId: watchlistId,
    });

    if (!watchlist) {
      return res.status(404).json({ message: "Item not found in watchlist." });
    }

    res.status(200).json({ message: "Item removed from watchlist." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
