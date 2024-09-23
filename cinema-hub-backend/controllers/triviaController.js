const User = require("../models/user");
const TriviaAnswers = require("../models/triviaAnswers");

exports.getTriviaAnswers = async (req, res) => {
  try {
    const currentPage = parseInt(req.query.page) || 1;
    console.log(currentPage);
    const perPage = 6;

    const userId = req.user.id;
    const triviaAnswers = await TriviaAnswers.find({ user: userId });

    const pagrinatedTriviaAnswers = triviaAnswers.slice(
      (currentPage - 1) * perPage,
      currentPage * perPage
    );

    const totalPages = Math.ceil(triviaAnswers.length / perPage);

    res.status(200).json({
      triviaAnswers: pagrinatedTriviaAnswers,
      totalPages,
      currentPage,
    });
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

exports.getTriviaLeaderboard = async (req, res, next) => {
  try {
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = 10;

    const triviaAnswers = await TriviaAnswers.find().populate("user");

    const leaderboard = {};

    triviaAnswers.forEach((trivia) => {
      const { correctAnswers, difficulty } = trivia;

      let weightedScore = 0;
      let currentBestAttempt = 0;

      switch (difficulty) {
        case "easy":
          weightedScore = correctAnswers; // 1 point per correct answer
          currentBestAttempt = correctAnswers * 1;
          break;
        case "medium":
          weightedScore = correctAnswers * 2; // 2 points per correct answer
          currentBestAttempt = correctAnswers * 2;
          break;
        case "hard":
          weightedScore = correctAnswers * 3; // 3 points per correct answer
          currentBestAttempt = correctAnswers * 3;
          break;
        default:
          weightedScore = correctAnswers; // Default to 1 point per answer
          currentBestAttempt = correctAnswers;
          break;
      }

      if (!leaderboard[trivia.user._id]) {
        leaderboard[trivia.user._id] = {
          username: trivia.user.username,
          totalScore: 0,
          totalAttempts: 0,
          bestAttempt: 0,
        };
      }

      leaderboard[trivia.user._id].totalScore += weightedScore;
      leaderboard[trivia.user._id].totalAttempts += 1;

      if (currentBestAttempt > leaderboard[trivia.user._id].bestAttempt) {
        leaderboard[trivia.user._id].bestAttempt = currentBestAttempt;
      }
    });

    const leaderboardArray = Object.values(leaderboard).sort(
      (a, b) => b.totalScore - a.totalScore
    );

    const totalCount = leaderboardArray.length;
    const totalPages = totalCount > 0 ? Math.ceil(totalCount / perPage) : 0;

    const paginatedLeaderboard = leaderboardArray.slice(
      (currentPage - 1) * perPage,
      currentPage * perPage
    );

    res.status(200).json({
      leaderboard: paginatedLeaderboard,
      totalPages,
      currentPage,
    });
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
    const triviaAnswers = await TriviaAnswers.find({ user: userId });

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
        $sort: { totalScore: -1 },
      },
    ]);

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
