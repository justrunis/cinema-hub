const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const watchlistSchema = new Schema({
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
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Watchlist", watchlistSchema);
