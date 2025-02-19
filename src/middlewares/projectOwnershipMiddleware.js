const prisma = require("../utils/prismaClient");

// const checkProjectOwnership = async (req, res, next) => {
//   const { projectId } = req.params;
//   const userId = req.user.id;

//   try {
//     const project = await prisma.project.findUnique({
//       where: { id: projectId },
//     });

//     if (project.ownerId !== userId) {
//       return res
//         .status(403)
//         .json({ error: "You do not have permission to modify this project" });
//     }

//     next();
//   } catch (error) {
//     res.status(500).json({ error: "Error checking project ownership" });
//   }
// };

const checkProjectOwnership = async (req, res, next) => {
  try {
    const userId = req.user.id; // Ensure req.user exists
    const { projectId } = req.params;

    console.log("🔍 Checking ownership - User ID:", userId);
    console.log("🔍 Checking ownership - Project ID:", projectId);
    console.log("🔍 Checking ownership - req.params:", req.params);

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

    next(); // ✅ Proceed to next middleware/controller
  } catch (error) {
    console.error("❌ Error in checkProjectOwnership:", error);
    res.status(500).json({ error: "Error checking project ownership" });
  }
};

module.exports = { checkProjectOwnership };
