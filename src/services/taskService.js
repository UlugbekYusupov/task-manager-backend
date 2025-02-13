const prisma = require("../utils/prismaClient");

exports.createTask = async (data) => {
  return await prisma.task.create({ data });
};

exports.getAllTasks = async () => {
  return await prisma.task.findMany();
};

exports.getTaskById = async (id) => {
  return await prisma.task.findUnique({ where: { id } });
};

exports.updateTask = async (id, data) => {
  return await prisma.task.update({ where: { id }, data });
};

exports.deleteTask = async (id) => {
  return await prisma.task.delete({ where: { id } });
};
