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

exports.createTask = async (
  projectId,
  title,
  description,
  assignedTo,
  ownerId
) => {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: { members: true },
  });

  if (!project) throw new Error("Project not found");
  if (project.ownerId !== ownerId)
    throw new Error("Only the project owner can assign tasks");

  const isMember = project.members.some((member) => member.id === assignedTo);
  if (!isMember) throw new Error("User is not a project member");

  const task = await prisma.task.create({
    data: {
      title,
      description,
      assignedTo: { connect: { id: assignedTo } }, // ✅ Correctly linking the assigned user
      project: { connect: { id: projectId } }, // ✅ Correctly linking the task to the project
    },
  });

  return task; // ✅ No need to update the project separately
};
