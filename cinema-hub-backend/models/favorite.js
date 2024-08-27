const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  itemId: {
    type: String, // ID of the movie or TV show from TMDB
    required: true,
  },
  itemType: {
    type: String, // Can be 'movie' or 'tv'
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  original_name: {
    type: String,
    required: true,
  },
  poster_path: {
    type: String,
    required: true,
  },
  vote_average: {
    type: Number,
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Favorite", favoriteSchema);
