const prisma = require("../utils/prismaClient");

exports.getAllUsers = async () => {
  return await prisma.user.findMany();
};
