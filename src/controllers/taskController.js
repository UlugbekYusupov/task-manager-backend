const TaskService = require("../services/taskService");

exports.createTask = async (req, res) => {
  try {
    const task = await TaskService.createTask(req.params.projectId, req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProjectTasks = async (req, res) => {
  try {
    const tasks = await TaskService.getTasksByProject(req.params.projectId);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const updatedTask = await TaskService.updateTaskStatus(
      req.params.taskId,
      req.body.status
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.assignTask = async (req, res) => {
  try {
    const updatedTask = await TaskService.assignTask(
      req.params.taskId,
      req.body.userId
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await TaskService.deleteTask(req.params.taskId);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
