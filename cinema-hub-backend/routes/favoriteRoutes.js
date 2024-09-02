const express = require("express");

const favoriteController = require("../controllers/favoriteController");

const router = express.Router();
const auth = require("../auth/auth");

// GET /favorites
router.get("/", auth, favoriteController.getFavorites);

// POST /favorites
router.post("/", auth, favoriteController.addFavorite);

// DELETE /favorites/:id
router.delete("/:id", favoriteController.deleteFavorite);

module.exports = router;
