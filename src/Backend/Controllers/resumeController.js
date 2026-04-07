const { db } = require("../config/db");
const { extractText } = require("../Services/parser");

// 🔹 Extract skills from JD
function extractSkillsFromJD(jobDescription) {
  const skillsList = [
    "javascript", "react", "node", "mongodb",
    "python", "java", "sql", "html", "css"
  ];

  const jd = jobDescription.toLowerCase();
  return skillsList.filter(skill => jd.includes(skill));
}

// 🔹 Extract experience
function extractExperience(text) {
  const match = text.match(/(\d+)\s+years?/i);
  return match ? parseInt(match[1]) : 0;
}

// 🔹 Extract education
function extractEducation(text) {
  const t = text.toLowerCase();

  if (t.includes("phd")) return 100;
  if (t.includes("m.tech") || t.includes("m.e")) return 90;
  if (t.includes("b.tech") || t.includes("b.e")) return 80;
  return 50;
}

// 🔥 MAIN ANALYSIS FUNCTION
async function analyzeResume(text, jobDescription, filename) {
  const resumeText = text.toLowerCase();

  // Skills
  const requiredSkills = extractSkillsFromJD(jobDescription);
  const matchedSkills = requiredSkills.filter(skill =>
    resumeText.includes(skill)
  );

  const skillsScore = requiredSkills.length === 0
    ? 0
    : Math.round((matchedSkills.length / requiredSkills.length) * 100);

  // Experience
  const years = extractExperience(text);
  const experienceScore = Math.min(years * 20, 100);

  // Education
  const educationScore = extractEducation(text);

  // Final score
  const overallScore = Math.round(
    skillsScore * 0.6 +
    experienceScore * 0.25 +
    educationScore * 0.15
  );

  return {
    name: filename.replace(/\.[^.]+$/, ""),
    matched_skills: matchedSkills,
    skills_score: skillsScore,
    experience_score: experienceScore,
    education_score: educationScore,
    overall_score: overallScore,
    summary: `Matched ${matchedSkills.length}/${requiredSkills.length} skills, ${years} years experience.`
  };
}

// 🚀 Upload & analyze
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

    // Save job
    const jobStmt = db.prepare(
      "INSERT INTO jobs (title, description) VALUES (?, ?)"
    );
    const jobResult = jobStmt.run(jobTitle || "Untitled Job", jobDescription);
    const jobId = jobResult.lastInsertRowid;

    const results = [];

    for (const file of files) {
      const text = await extractText(file.path);

      const analysis = await analyzeResume(
        text,
        jobDescription,
        file.originalname
      );

      // Save resume
      db.prepare(`
        INSERT INTO resumes 
        (job_id, candidate_name, filename, file_path, extracted_text, 
         overall_score, skills_score, experience_score, education_score, 
         matched_skills, summary)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
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

    // 🔥 Sort by score
    results.sort((a, b) => b.overall_score - a.overall_score);

    // 🔥 Assign rank
    results.forEach((r, i) => {
      db.prepare(
        "UPDATE resumes SET rank_position = ? WHERE job_id = ? AND filename = ?"
      ).run(i + 1, jobId, r.filename);
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

// 🚀 Get results
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

module.exports = { uploadResumes, getResults }