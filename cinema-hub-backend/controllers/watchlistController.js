const User = require("../models/user");
const Watchlist = require("../models/watchlist");

exports.getWatchlist = async (req, res) => {
  const userId = req.user._id;

  const watchlist = await Watchlist.find({ user: userId });

  res.status(200).json(watchlist);
};

exports.addWatchlist = async (req, res) => {
  const userId = req.user._id;
  const { itemId, itemType, name, original_name, poster_path, vote_average } =
    req.body;

  const newWatchlist = new Watchlist({
    user: userId,
    itemId,
    itemType,
    name,
    original_name,
    poster_path,
    vote_average,
  });

  await newWatchlist.save();

  res.status(201).json({ message: "Item added to watchlist." });
};

exports.deleteWatchlist = async (req, res) => {
  const userId = req.user._id;
  const watchlistId = req.params.id;

  const watchlist = await Watchlist.findOne({ _id: watchlistId, user: userId });

  if (!watchlist) {
    return res.status(404).json({ message: "Item not found in watchlist." });
  }

  await watchlist.remove();

  res.status(200).json({ message: "Item removed from watchlist." });
};
