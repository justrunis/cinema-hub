const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const triviaAnswersSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  correctAnswers: {
    type: Number,
    required: true,
  },
  questions: {
    type: Array,
    required: true,
    default: [],
  },
});

module.exports = mongoose.model("TriviaAnswers", triviaAnswersSchema);
