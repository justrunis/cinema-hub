const Favorite = require("../models/favorite");
const User = require("../models/user");

exports.getFavorites = async (req, res) => {
  console.log(req.user);
  const userId = req.user.id;

  const favorites = await Favorite.find({ user: userId });

  res.status(200).json(favorites);
};

exports.addFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      itemId,
      itemType,
      title,
      original_name,
      poster_path,
      vote_average,
    } = req.body;

    const user = await User.findById(userId);

    // Check if the movie or TV show is already in favorites
    const existingFavorite = await Favorite.findOne({
      user: userId,
      itemId: itemId,
    });

    if (existingFavorite) {
      return res.status(400).json({ message: "Item already in favorites." });
    }

    const newFavorite = new Favorite({
      user: user,
      itemId: itemId,
      itemType: itemType,
      title: title,
      original_name: original_name || title, // Default to title if original_name is not provided
      poster_path: poster_path,
      vote_average: vote_average,
      addedAt: new Date(),
    });

    await newFavorite.save();

    res
      .status(201)
      .json({ message: "Item added to favorites.", favorite: newFavorite });
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ message: "Server error." });
  }
};

exports.isFavorite = async (req, res) => {
  const userId = req.user.id;
  const itemId = req.params.id;

  const favorite = await Favorite.findOne({ user: userId, itemId: itemId });

  if (favorite) {
    return res.status(200).json({ isFavorite: true });
  }

  res.status(200).json({ isFavorite: false });
};

exports.deleteFavorite = async (req, res) => {
  const userId = req.user.id;
  const favoriteId = req.params.id;

  const favorite = await Favorite.findOneAndDelete({
    itemId: favoriteId,
    user: userId,
  });

  if (!favorite) {
    return res.status(404).json({ message: "Favorite not found." });
  }

  res.status(200).json({ message: "Favorite deleted." });
};
