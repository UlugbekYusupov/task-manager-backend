const TaskService = require("../services/taskService");

exports.getAllTasksForProject = async (req, res) => {
  try {
    const tasks = await TaskService.getAllTasksForProject(req.params.projectId);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;
    const projectId = req.params.projectId;
    const ownerId = req.user.id;

    console.log("🔍 Project ID:", projectId);
    console.log("🔍 Title:", title);
    console.log("🔍 Description:", description);
    console.log("🔍 Assigned To:", assignedTo);
    console.log("🔍 Owner ID:", ownerId);

    const task = await TaskService.createTask(
      projectId,
      title,
      description,
      assignedTo,
      ownerId
    );
    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
