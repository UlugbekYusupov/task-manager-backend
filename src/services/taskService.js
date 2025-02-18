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

exports.createTask = async (projectId, title, description) => {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });
  if (!project) throw new Error("Project not found");

  const task = await prisma.task.create({
    data: {
      title,
      description,
      projectId,
    },
  });

  await prisma.project.update({
    where: { id: projectId },
    data: {
      tasks: {
        connect: { id: task.id },
      },
    },
  });

  return task;
};
