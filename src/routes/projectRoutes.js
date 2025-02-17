const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const authenticateUser = authMiddleware.authenticateUser;
const projectController = require("../controllers/projectController");

const router = express.Router();

router.post("/", authenticateUser, projectController.createProject);
router.get("/:projectId", authenticateUser, projectController.getProject);

router.get("/", authenticateUser, projectController.getProjects);
router.post("/:id/members", authenticateUser, projectController.addMember);

router.post(
  "/:projectId/tasks",
  authenticateUser,
  projectController.createTask
);
router.get(
  "/:projectId/tasks",
  authenticateUser,
  projectController.getAllTasksForProject
);

module.exports = router;
