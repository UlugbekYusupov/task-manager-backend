const prisma = require("../utils/prismaClient");



// exports.getTasksByProject = async (projectId) => {
//   return await prisma.task.findMany({ where: { projectId } });
// };

// exports.updateTaskStatus = async (taskId, status) => {
//   return await prisma.task.update({
//     where: { id: taskId },
//     data: { status },
//   });
// };

// exports.assignTask = async (taskId, userId) => {
//   return await prisma.task.update({
//     where: { id: taskId },
//     data: { assignedTo: { connect: { id: userId } } },
//   });
// };

// exports.deleteTask = async (taskId) => {
//   return await prisma.task.delete({ where: { id: taskId } });
// };
