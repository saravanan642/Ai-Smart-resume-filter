const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { uploadResumes, getResults } = require("../Controllers/resumeController");

// Upload resumes and analyze
router.post("/upload", upload.array("resumes", 100), uploadResumes);

// Get results by job ID
router.get("/results/:jobId", getResults);

module.exports = router