const User = require("../models/user");
const TriviaAnswers = require("../models/triviaAnswers");

exports.getTriviaAnswers = async (req, res) => {
  const userId = req.user.id;

  try {
    const triviaAnswers = await TriviaAnswers.find({ user: userId });
    res.status(200).json(triviaAnswers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.postUserTriviaAnswers = async (req, res) => {
  const userId = req.user.id;
  const { category, difficulty, correctAnswers, questions } = req.body;

  try {
    if (questions.length > 10) {
      return res
        .status(400)
        .json({ message: "Questions length should be less than 10" });
    }

    const triviaAnswers = new TriviaAnswers({
      user: userId,
      category,
      difficulty,
      correctAnswers,
      questions,
    });

    await triviaAnswers.save();
    res.status(201).json(triviaAnswers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
