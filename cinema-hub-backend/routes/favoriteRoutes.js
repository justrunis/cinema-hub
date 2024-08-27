const express = require("express");

const favoriteController = require("../controllers/favoriteController");

const router = express.Router();

// GET /favorites
router.get("/", favoriteController.getFavorites);

// POST /favorites
router.post("/", favoriteController.addFavorite);

// DELETE /favorites/:id
router.delete("/:id", favoriteController.deleteFavorite);

module.exports = router;
