const prisma = require("../utils/prismaClient");

const checkProjectOwnership = async (req, res, next) => {
  const { projectId } = req.params;
  const userId = req.user.id;

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (project.ownerId !== userId) {
      return res
        .status(403)
        .json({ error: "You do not have permission to modify this project" });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Error checking project ownership" });
  }
};

module.exports = { checkProjectOwnership };
