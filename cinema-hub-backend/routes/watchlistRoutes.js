const express = require("express");

const watchlistController = require("../controllers/watchlistController");

const router = express.Router();

// GET /watchlist
router.get("/", watchlistController.getWatchlist);

// POST /watchlist
router.post("/", watchlistController.addWatchlist);

// DELETE /watchlist/:id
router.delete("/:id", watchlistController.deleteWatchlist);

module.exports = router;
