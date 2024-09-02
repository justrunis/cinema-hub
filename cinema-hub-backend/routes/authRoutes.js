const express = require("express");

const authController = require("../controllers/authController");

const router = express.Router();

// POST /auth/register
router.post("/register", authController.createUser);

// POST /auth/login
router.post("/login", authController.loginUser);

// GET /auth/logout
router.get("/logout", authController.logoutUser);

module.exports = router;
