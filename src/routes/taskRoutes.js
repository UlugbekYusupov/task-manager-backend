const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const authenticateUser = authMiddleware.authenticateUser;
const taskController = require("../controllers/taskController");

const router = express.Router();

router.post("/:projectId/tasks", authenticateUser, taskController.createTask);
router.get("/:projectId/tasks", authenticateUser, taskController.getProjectTasks);
router.patch("/:taskId/status", authenticateUser, taskController.updateTaskStatus);
router.patch("/:taskId/assign", authenticateUser, taskController.assignTask);
router.delete("/:taskId", authenticateUser, taskController.deleteTask);

module.exports = router;
