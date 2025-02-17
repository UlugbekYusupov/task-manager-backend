const ProjectService = require("../services/projectService");

exports.createProject = async (req, res) => {
  try {
    const project = await ProjectService.createProject(
      req.user.id,
      req.body.name
    );
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("Fetching projects for user:", userId);

    const projects = await ProjectService.getUserProjects(userId);
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProject = async (req, res) => {
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
    const projectId = req.params.id;

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

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const projectId = req.params.projectId;

    const task = await ProjectService.createTask(projectId, title, description);

    
    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
