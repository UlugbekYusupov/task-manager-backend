require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Task Manager API is running...");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
