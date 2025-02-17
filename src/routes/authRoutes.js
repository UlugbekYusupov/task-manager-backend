require("dotenv").config();
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile", authMiddleware.authenticateUser, authController.getProfile);
router.get("/users", authMiddleware.authenticateUser, authController.getAllUsers);

module.exports = router;

