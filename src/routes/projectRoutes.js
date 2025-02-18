const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const authenticateUser = authMiddleware.authenticateUser;

const projectOwnershipMiddleware = require("../middlewares/projectOwnershipMiddleware");
const checkProjectOwnership = projectOwnershipMiddleware.checkProjectOwnership;

const projectMembershipMiddleware = require("../middlewares/projectMembershipMiddleware");
const checkProjectMembership =
  projectMembershipMiddleware.checkProjectMembership;

const projectController = require("../controllers/projectController");
const router = express.Router();

router.post("/", authenticateUser, projectController.createProject);
router.get("/", authenticateUser, projectController.getProjects);

router.get(
  "/:projectId",
  authenticateUser,
  checkProjectMembership,
  projectController.getProjectById
);

router.get(
  "/:projectId/tasks",
  authenticateUser,
  checkProjectMembership,
  projectController.getAllTasksForProject
);

router.post(
  "/:projectId/members",
  authenticateUser,
  checkProjectOwnership,
  projectController.addMember
);

router.post(
  "/:projectId/tasks",
  authenticateUser,
  checkProjectOwnership,
  projectController.createTask
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

module.exports = router;
