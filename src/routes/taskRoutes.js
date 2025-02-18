const express = require("express");
const router = express.Router();

// const authMiddleware = require("../middlewares/authMiddleware");
// const authenticateUser = authMiddleware.authenticateUser;

// const projectOwnershipMiddleware = require("../middlewares/projectOwnershipMiddleware");
// const checkProjectOwnership = projectOwnershipMiddleware.checkProjectOwnership;

// const projectMembershipMiddleware = require("../middlewares/projectMembershipMiddleware");
// const checkProjectMembership =
//   projectMembershipMiddleware.checkProjectMembership;

const {
  authenticateUser,
  checkProjectOwnership,
  checkProjectMembership,
} = require("../middlewares");

const taskController = require("../controllers/taskController");

router.get(
  "/:projectId/tasks",
  authenticateUser,
  checkProjectMembership,
  taskController.getAllTasksForProject
);

router.post(
  "/:projectId/tasks",
  authenticateUser,
  checkProjectOwnership,
  taskController.createTask
);
