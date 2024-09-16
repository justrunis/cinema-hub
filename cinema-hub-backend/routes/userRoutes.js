const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

const auth = require("../auth/auth");

// GET /users/user
router.get("/user", auth, userController.getUser);

// PUT /users/bio
router.put("/bio", auth, userController.updateBio);

module.exports = router;
