const express = require("express");

const triviaController = require("../controllers/triviaController");

const router = express.Router();
const auth = require("../auth/auth");

// GET /trivia
router.get("/", auth, triviaController.getTriviaAnswers);

// POST /trivia
router.post("/", auth, triviaController.postUserTriviaAnswers);

// GET /trivia/leaderboard
router.get("/leaderboard", auth, triviaController.getTriviaLeaderboard);

// GET /trivia/points
router.get("/points/:id", auth, triviaController.getTriviaPointsForUser);

module.exports = router;
