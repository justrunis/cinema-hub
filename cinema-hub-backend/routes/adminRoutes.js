const express = require("express");

const adminController = require("../controllers/adminController");

const router = express.Router();
const auth = require("../auth/auth");

// GET /admin/users
router.get("/users", auth, adminController.getUsers);

// GET /admin/users/:userId
router.get("/users/:userId", auth, adminController.getUser);

// PUT /admin/users/:userId
router.put("/users/:userId", auth, adminController.updateUser);

// DELETE /admin/users/:userId
router.delete("/users/:userId", auth, adminController.deleteUser);

module.exports = router;
