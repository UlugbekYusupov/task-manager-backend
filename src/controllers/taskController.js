const TaskService = require("../services/taskService");

exports.getAllTasksForProject = async (req, res) => {
  try {
    const tasks = await TaskService.getAllTasksForProject(req.params.projectId);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.createTask = async (req, res) => {
//   try {
//     const { title, description, assignedTo } = req.body;
//     const projectId = req.params.projectId;
//     const ownerId = req.user.id;

//     const task = await TaskService.createTask(
//       projectId,
//       title,
//       description,
//       assignedTo,
//       ownerId
//     );
//     res.status(201).json({
//       message: "Task created successfully",
//       task,
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// exports.updateTask = async (req, res) => {
//   try {
//     const { projectId, taskId } = req.params;
//     const userId = req.user.id;
//     const updates = req.body;

//     const updatedTask = await TaskService.updateTask(taskId, userId, updates);
//     res.status(200).json(updatedTask);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

exports.createTask = async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    const projectId = req.params.projectId;
    const ownerId = req.user.id;

    const task = await TaskService.createTask(
      projectId,
      title,
      description,
      userId,
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

exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const updates = req.body;
    const updatedTask = await TaskService.updateTask(taskId, updates);

    res.status(200).json({
      message: "Task updated successfully",
      updatedTask,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
