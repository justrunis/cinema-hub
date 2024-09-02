const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  itemId: {
    type: Number,
    required: true,
  },
  itemType: {
    type: String,
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
    required: true,
  },
});

module.exports = mongoose.model("Favorite", favoriteSchema);
