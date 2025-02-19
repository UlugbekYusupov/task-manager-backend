// const express = require("express");
// const router = express.Router();

// const {
//   authenticateUser,
//   checkProjectOwnership,
//   checkProjectMembership,
// } = require("../middlewares");

// const taskController = require("../controllers/taskController");

// router.get(
//   "/:projectId/tasks",
//   authenticateUser,
//   checkProjectMembership,
//   taskController.getAllTasksForProject
// );

// router.post(
//   "/:projectId/tasks",
//   authenticateUser,
//   checkProjectOwnership,
//   taskController.createTask
// );
