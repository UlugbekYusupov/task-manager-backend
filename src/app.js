const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
// app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
