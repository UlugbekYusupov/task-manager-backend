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
  const ownedProjects = await prisma.project.findMany({
    where: { ownerId: userId },
    include: {
      owner: true,
      members: true,
      tasks: { include: { assignedTo: true } },
    },
  });

  const participatedProjects = await prisma.project.findMany({
    where: {
      members: { some: { id: userId } },
      NOT: { ownerId: userId },
    },
    include: { owner: true, members: true, tasks: true },
  });

  return { ownedProjects, participatedProjects };
};

exports.getProjectById = async (projectId) => {
  return await prisma.project.findUnique({
    where: { id: projectId },
    include: { members: true, tasks: true },
  });
};

exports.addMemberToProject = async (projectId, userId) => {
  if (!projectId) {
    throw new Error("Project ID is required but was undefined");
  }
  if (!userId) {
    throw new Error("User ID is required but was undefined");
  }

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: { members: true },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  return await prisma.project.update({
    where: { id: projectId },
    data: {
      members: {
        connect: { id: userId },
      },
    },
    include: { members: true },
  });
};

exports.updateProject = async (projectId, data) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new Error("Project not found");
    }

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data,
    });

    return updatedProject;
  } catch (error) {
    console.error("Prisma update error:", error);
    throw new Error("Error updating project");
  }
};

exports.deleteProject = async (projectId) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new Error("Project not found");
    }

    await prisma.project.delete({
      where: { id: projectId },
      include: {
        members: true,
        tasks: true,
      },
    });

    return { id: projectId };
  } catch (error) {
    throw new Error("Error deleting project");
  }
};
