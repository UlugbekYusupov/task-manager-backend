const prisma = require("../utils/prismaClient");

const checkProjectOwnership = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { projectId } = req.params;

    if (!userId || !projectId) {
      return res
        .status(400)
        .json({ error: "User ID and Project ID are required" });
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: { ownerId: true },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    if (project.ownerId !== userId) {
      return res.status(403).json({ error: "User is not the project owner" });
    }

    next();
  } catch (error) {
    console.error("❌ Error in checkProjectOwnership:", error);
    res.status(500).json({ error: "Error checking project ownership" });
  }
};

module.exports = { checkProjectOwnership };
