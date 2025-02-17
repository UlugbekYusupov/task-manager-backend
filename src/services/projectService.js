const prisma = require("../utils/prismaClient");

exports.createProject = async (userId, name) => {
  return await prisma.project.create({
    data: {
      name,
      ownerId: userId,
      members: { connect: { id: userId } },
    },
  });
};

exports.getUserProjects = async (userId) => {
  return await prisma.project.findMany({
    where: {
      members: { some: { id: userId } },
    },
    include: { owner: true, members: true, tasks: true },
  });
};

exports.getProjectById = async (projectId) => {
  return await prisma.project.findUnique({
    where: { id: projectId },
    include: { members: true, tasks: true },
  });
};

exports.addMemberToProject = async (projectId, userId) => {
  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) throw new Error("Project not found");

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  return await prisma.project.update({
    where: { id: projectId },
    data: { members: { connect: { id: userId } } },
  });
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
