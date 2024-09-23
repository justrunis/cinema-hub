const User = require("../models/user");
const TriviaAnswers = require("../models/triviaAnswers");

exports.getTriviaAnswers = async (req, res) => {
  try {
    const userId = req.user.id;
    const triviaAnswers = await TriviaAnswers.find({ user: userId });
    res.status(200).json(triviaAnswers);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.postUserTriviaAnswers = async (req, res) => {
  try {
    const userId = req.user.id;
    const { category, difficulty, correctAnswers, questions } = req.body;
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
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getTriviaLeaderboard = async (req, res) => {
  try {
    const triviaAnswers = await TriviaAnswers.find().populate("user");

    const leaderboard = {};

    triviaAnswers.forEach((trivia) => {
      let weightedScore = 0;

      // Use switch/case to determine the weighting based on the difficulty
      switch (trivia.difficulty) {
        case "easy":
          weightedScore = trivia.correctAnswers; // 1 point per correct answer for easy
          break;
        case "medium":
          weightedScore = trivia.correctAnswers * 2; // 2 points per correct answer for medium
          break;
        case "hard":
          weightedScore = trivia.correctAnswers * 3; // 3 points per correct answer for hard
          break;
        default:
          weightedScore = trivia.correctAnswers; // Default case (if difficulty is unknown or malformed)
          break;
      }

      // Check if the user is already in the leaderboard
      if (!leaderboard[trivia.user._id]) {
        leaderboard[trivia.user._id] = {
          username: trivia.user.username,
          totalScore: 0,
        };
      }

      leaderboard[trivia.user._id].totalScore += weightedScore;
    });

    const leaderboardArray = Object.values(leaderboard);

    leaderboardArray.sort((a, b) => b.totalScore - a.totalScore);

    res.status(200).json(leaderboardArray);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getTriviaPointsForUser = async (req, res) => {
  try {
    const userId = req.params.id;
    // Fetch all trivia answers for the user
    const triviaAnswers = await TriviaAnswers.find({ user: userId });

    // Calculate the total score for the current user
    let totalScore = 0;

    triviaAnswers.forEach((trivia) => {
      let weightedScore = 0;

      switch (trivia.difficulty) {
        case "easy":
          weightedScore = trivia.correctAnswers;
          break;
        case "medium":
          weightedScore = trivia.correctAnswers * 2;
          break;
        case "hard":
          weightedScore = trivia.correctAnswers * 3;
          break;
        default:
          weightedScore = trivia.correctAnswers;
          break;
      }

      totalScore += weightedScore;
    });

    // Fetch all users' scores to calculate rank
    const allUsers = await TriviaAnswers.aggregate([
      {
        $group: {
          _id: "$user",
          totalScore: {
            $sum: {
              $switch: {
                branches: [
                  {
                    case: { $eq: ["$difficulty", "easy"] },
                    then: "$correctAnswers",
                  },
                  {
                    case: { $eq: ["$difficulty", "medium"] },
                    then: { $multiply: ["$correctAnswers", 2] },
                  },
                  {
                    case: { $eq: ["$difficulty", "hard"] },
                    then: { $multiply: ["$correctAnswers", 3] },
                  },
                ],
                default: "$correctAnswers",
              },
            },
          },
        },
      },
      {
        $sort: { totalScore: -1 }, // Sort by totalScore in descending order
      },
    ]);

    // Find the rank of the current user
    const rank =
      allUsers.findIndex((user) => user._id.toString() === userId) + 1;

    res.status(200).json({ totalScore, rank });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
