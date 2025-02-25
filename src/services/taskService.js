const prisma = require("../utils/prismaClient");

exports.getAllTasksForProject = async (projectId) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: projectId,
      },
      include: {
        assignedTo: true,
      },
    });
    return tasks;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.createTask = async (projectId, title, description, userId, ownerId) => {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: { members: true },
  });

  if (!project) throw new Error("Project not found");

  if (project.ownerId !== ownerId) {
    throw new Error("Only the project owner can create tasks");
  }

  if (userId) {
    const isMember = project.members.some((member) => member.id === userId);
    if (!isMember) throw new Error("User is not a project member");
  }

  const task = await prisma.task.create({
    data: {
      title,
      description,
      userId: userId || null,
      projectId,
    },
  });

  return task;
};

exports.updateTask = async (taskId, updates) => {
  const updateData = {};

  if (updates.title) updateData.title = updates.title;
  if (updates.description) updateData.description = updates.description;
  if (updates.status) updateData.status = updates.status;
  if (updates.priority) updateData.priority = updates.priority;

  if (updates.userId !== undefined) {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: { project: { include: { members: true } } },
    });

    if (!task) {
      throw new Error("Task not found");
    }

    if (updates.userId !== null) {
      // Ensure the user is a member before assigning
      const userExists = task.project.members.some(
        (member) => member.id === updates.userId
      );

      if (!userExists) {
        throw new Error("User is not a project member");
      }

      updateData.userId = updates.userId; // Assign user
    } else {
      updateData.userId = null; // ✅ Unassign user
    }
  }

  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: updateData,
  });

  return updatedTask;
};