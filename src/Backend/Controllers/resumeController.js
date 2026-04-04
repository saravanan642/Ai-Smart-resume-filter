const { db } = require("../config/db");
const { extractText } = require("../Services/parser");
const { analyzeResume } = require("../Services/matcher");

// Upload and analyze resumes
async function uploadResumes(req, res) {
  try {
    const { jobTitle, jobDescription } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded!" });
    }
    if (!jobDescription) {
      return res.status(400).json({ error: "Job description required!" });
    }

    // Save job to DB
    const jobStmt = db.prepare(
      "INSERT INTO jobs (title, description) VALUES (?, ?)"
    );
    const jobResult = jobStmt.run(jobTitle || "Untitled Job", jobDescription);
    const jobId = jobResult.lastInsertRowid;

    // Process each resume
    const results = [];
    for (const file of files) {
      // Extract text from PDF/TXT
      const text = await extractText(file.path);

      // AI analysis
      const analysis = await analyzeResume(text, jobDescription, file.originalname);

      // Save to DB
      const resumeStmt = db.prepare(`
        INSERT INTO resumes 
        (job_id, candidate_name, filename, file_path, extracted_text, 
         overall_score, skills_score, experience_score, education_score, 
         matched_skills, summary)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      resumeStmt.run(
        jobId,
        analysis.name,
        file.originalname,
        file.path,
        text,
        analysis.overall_score,
        analysis.skills_score,
        analysis.experience_score,
        analysis.education_score,
        JSON.stringify(analysis.matched_skills),
        analysis.summary
      );

      results.push({ ...analysis, filename: file.originalname });
    }

    // Sort by overall_score
    results.sort((a, b) => b.overall_score - a.overall_score);

    // Update rank positions
    results.forEach((r, i) => {
      db.prepare("UPDATE resumes SET rank_position = ? WHERE job_id = ? AND filename = ?")
        .run(i + 1, jobId, r.filename);
    });

    res.json({
      success: true,
      jobId,
      totalResumes: results.length,
      results,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: error.message });
  }
}

// Get results by job ID
function getResults(req, res) {
  try {
    const { jobId } = req.params;
    const resumes = db
      .prepare("SELECT * FROM resumes WHERE job_id = ? ORDER BY overall_score DESC")
      .all(jobId);

    const parsed = resumes.map((r) => ({
      ...r,
      matched_skills: JSON.parse(r.matched_skills || "[]"),
    }));

    res.json({ success: true, results: parsed });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { uploadResumes, getResults };