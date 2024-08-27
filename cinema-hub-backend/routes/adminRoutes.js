const express = require("express");

const adminController = require("../controllers/adminController");

const router = express.Router();

// GET /admin/users
router.get("/users", adminController.getUsers);

// GET /admin/users/:userId
router.get("/users/:userId", adminController.getUser);

// PUT /admin/users/:userId
router.put("/users/:userId", adminController.updateUser);

// DELETE /admin/users/:userId
router.delete("/users/:userId", adminController.deleteUser);

module.exports = router;
