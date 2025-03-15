const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../utils/prismaClient");

exports.register = async (username, email, password) => {
  const [existingUser, existingUsername] = await Promise.all([
    prisma.user.findUnique({ where: { email } }),
    prisma.user.findUnique({ where: { username } }),
  ]);

  if (existingUser) {
    throw new Error("Email already in use");
  }

  if (existingUsername) {
    throw new Error("Username already taken");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { username, email, password: hashedPassword },
  });
  return { message: "User registered successfully", userId: user.id };
};

// exports.login = async (email, password) => {
//   const user = await prisma.user.findUnique({ where: { email } });

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     throw new Error("Invalid email or password");
//   }
//   const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//     expiresIn: "2h",
//   });

//   return {
//     token,
//     userId: user.id,
//     email: user.email,
//     username: user.username,
//     participatedProjects: user.projects || [],
//     ownedProjects: user.ownedProjects || [],
//     invitations: user.invitations || [],
//   };
// };

exports.login = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      ownedProjects: true,
      participatedProjects: true,
      invitations: true,
    },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid email or password");
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  return {
    token,
    userId: user.id,
    email: user.email,
    username: user.username,
    participatedProjects: user.participatedProjects || [],
    ownedProjects: user.ownedProjects || [],
    invitations: user.invitations || [],
  };
};

exports.getProfile = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      projects: true,
      ownedProjects: true,
      tasks: { select: { project: true } },
      invitations: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

exports.getAllUsers = async () => {
  const users = await prisma.user.findMany({
    include: {
      projects: {
        select: {
          tasks: true,
          members: true,
        },
      },
      ownedProjects: {
        select: {
          tasks: true,
          members: true,
        },
      },
      tasks: {
        select: {
          project: true,
        },
      },
      invitations: true,
    },
  });

  return users;
};
