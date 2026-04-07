require("dotenv").config();

const express = require("express");
const cors = require("cors");

// 🔥 FIXED PATH
const resumeRoutes = require("../routes/resumeRoutes");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/resume", resumeRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API Working ✅");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});