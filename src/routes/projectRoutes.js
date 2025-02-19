const express = require("express");
const {
  authenticateUser,
  checkProjectOwnership,
  checkProjectMembership,
} = require("../middlewares");

const projectController = require("../controllers/projectController");
const taskController = require("../controllers/taskController");

const router = express.Router();

router.post("/", authenticateUser, projectController.createProject);
router.get("/", authenticateUser, projectController.getProjects);

router.get(
  "/:projectId",
  authenticateUser,
  checkProjectMembership,
  projectController.getProjectById
);

router.post(
  "/:projectId/members",
  authenticateUser,
  checkProjectOwnership,
  projectController.addMember
);

router.put(
  "/:projectId",
  authenticateUser,
  checkProjectOwnership,
  projectController.updateProject
);

router.delete(
  "/:projectId",
  authenticateUser,
  checkProjectOwnership,
  projectController.deleteProject
);

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

module.exports = router;
