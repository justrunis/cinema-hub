const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

// POST /users/register
router.post("/register", userController.createUser);

// POST /users/login
router.post("/login", userController.loginUser);

// GET /users/user
router.get("/user", userController.getUser);

// POST /users/logout
router.post("/logout", userController.logoutUser);

module.exports = router;
