const express = require("express");

const adminController = require("../controllers/adminController");
const { model } = require("mongoose");

const router = express.Router();

// GET /admin/users

router.get("/users", adminController.getUsers);

module.exports = router;
