const Favorite = require("../models/favorite");
const User = require("../models/user");

exports.getFavorites = async (req, res) => {
  const userId = req.user._id;

  const favorites = await Favorite.find({ user: userId }).populate("movie");

  res.status(200).json(favorites);
};

exports.addFavorite = async (req, res) => {
  const userId = req.user._id;
  const { movieId } = req.body;

  const existingFavorite = await Favorite.findOne({
    user: userId,
    movie: movieId,
  });

  if (existingFavorite) {
    return res.status(400).json({ message: "Movie already in favorites." });
  }

  const newFavorite = new Favorite({ user: userId, movie: movieId });
  await newFavorite.save();

  res.status(201).json({ message: "Movie added to favorites." });
};

exports.deleteFavorite = async (req, res) => {
  const userId = req.user._id;
  const favoriteId = req.params.id;

  const favorite = await Favorite.findOne({ _id: favoriteId, user: userId });

  if (!favorite) {
    return res.status(404).json({ message: "Favorite not found." });
  }

  await favorite.remove();

  res.status(200).json({ message: "Favorite deleted." });
};
