const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/api", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
