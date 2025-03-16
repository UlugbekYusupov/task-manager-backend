const ProjectService = require("../services/projectService");

exports.createProject = async (req, res) => {
  try {
    const project = await ProjectService.createProject(
      req.user.id,
      req.body.name,
      req.body.description
    );
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const userId = req.user.id;
    const projects = await ProjectService.getUserProjects(userId);
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await ProjectService.getProjectById(req.params.projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.addMember = async (req, res) => {
  try {
    const { userId } = req.body;
    const { projectId } = req.params;

    const updatedProject = await ProjectService.addMemberToProject(
      projectId,
      userId
    );
    res.status(200).json({
      message: "User added to project successfully",
      project: updatedProject,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProject = async (req, res) => {
  const { projectId } = req.params;
  const data = req.body;

  try {
    const updatedProject = await ProjectService.updateProject(projectId, data);
    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Failed to update project" });
  }
};

exports.deleteProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    await ProjectService.deleteProject(projectId);
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project" });
  }
};
