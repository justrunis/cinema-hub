const express = require("express");

const friendsController = require("../controllers/friendsController");

const router = express.Router();

// GET /friends
router.get("/", friendsController.getFriends);

// GET /friends/suggested
router.get("/suggested", friendsController.getSuggestedFriends);

// GET /friends/list
router.get("/list", friendsController.getFriendsList);

// GET /friends/requests
router.get("/requests", friendsController.getFriendsRequests);

// POST /friends
router.post("/", friendsController.addFriend);

// DELETE /friends/:id
router.delete("/:id", friendsController.deleteFriend);

module.exports = router;
