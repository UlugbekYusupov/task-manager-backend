const prisma = require("../utils/prismaClient");

const checkProjectMembership = async (req, res, next) => {
  const { projectId } = req.params;
  const userId = req.user.id;

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { members: true, owner: true },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const isOwner = project.ownerId === userId;
    const isMember = project.members.some((member) => member.id === userId);

    if (!isOwner && !isMember) {
      return res
        .status(403)
        .json({ error: "Access denied. You are not a project member." });
    }

    next();
  } catch (error) {
    console.error("Error checking project membership:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { checkProjectMembership };
