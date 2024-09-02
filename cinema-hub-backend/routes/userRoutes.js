const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

const auth = require("../auth/auth");

// GET /users/user
router.get("/user", auth, userController.getUser);

module.exports = router;
