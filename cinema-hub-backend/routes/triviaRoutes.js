const express = require("express");

const triviaController = require("../controllers/triviaController");

const router = express.Router();
const auth = require("../auth/auth");

// GET /trivia
router.get("/", auth, triviaController.getTriviaAnswers);

// POST /trivia
router.post("/", auth, triviaController.postUserTriviaAnswers);

module.exports = router;
