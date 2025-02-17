const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const authenticateUser = authMiddleware.authenticateUser;
const projectController = require("../controllers/projectController");

const router = express.Router();

router.post("/", authenticateUser, projectController.createProject);
router.get("/:projectId", authenticateUser, projectController.getProject);

router.get("/", authenticateUser, projectController.getProjects);
router.post("/:id/members", authenticateUser, projectController.addMember);

module.exports = router;
