const express = require("express");

const friendsController = require("../controllers/friendsController");

const router = express.Router();
const auth = require("../auth/auth");

// GET /friends
router.get("/", auth, friendsController.getFriends);

// GET /friends/suggested
router.get("/suggested", auth, friendsController.getSuggestedFriends);

// GET /friends/list
router.get("/list", auth, friendsController.getFriendsList);

// GET /friends/requests
router.get("/requests", auth, friendsController.getFriendsRequests);

// POST /friends
router.post("/", auth, friendsController.addFriend);

// PUT /friends/:id
router.put("/:id", auth, friendsController.acceptFriendRequest);

// DELETE /friends/:id
router.delete("/:id", auth, friendsController.rejectFriendRequest);

// DELETE /friends/delete/:id
router.delete("/delete/:id", auth, friendsController.deleteFriend);

module.exports = router;
