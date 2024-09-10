const express = require("express");

const watchlistController = require("../controllers/watchlistController");

const router = express.Router();
const auth = require("../auth/auth");

// GET /watchlist
router.get("/", auth, watchlistController.getWatchlist);

// POST /watchlist
router.post("/", auth, watchlistController.addWatchlist);

// DELETE /watchlist/:id
router.delete("/:id", auth, watchlistController.deleteWatchlist);

// GET /watchlist/isInWatchlist/:id
router.get("/isInWatchlist/:id", auth, watchlistController.isInWatchlist);

module.exports = router;
