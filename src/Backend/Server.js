const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./config/db");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Database initialize
db.initializeDB();

// Routes
app.use("/api", resumeRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Resume Screener API Running!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
