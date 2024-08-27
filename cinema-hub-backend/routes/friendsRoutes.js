const express = require("express");

const friendsController = require("../controllers/friendsController");

const router = express.Router();

// GET /friends
router.get("/", friendsController.getFriends);

// POST /friends
router.post("/", friendsController.addFriend);

// DELETE /friends/:id
router.delete("/:id", friendsController.deleteFriend);

module.exports = router;
