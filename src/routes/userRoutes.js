const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", authMiddleware.authenticateUser, userController.getAllUsers);

module.exports = router;
