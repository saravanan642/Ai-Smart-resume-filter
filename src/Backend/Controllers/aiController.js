const { analyzeResume } = require("../Services/matcher");
const { extractText } = require("../Services/parser");

// Single resume analyze பண்ண
async function analyzeOne(req, res) {
  try {
    const { jobDescription } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "Resume file required!" });
    }
    if (!jobDescription) {
      return res.status(400).json({ error: "Job description required!" });
    }

    // Extract text from file
    const text = await extractText(file.path);

    // AI analyze
    const result = await analyzeResume(text, jobDescription, file.originalname);

    res.json({ success: true, result });
  } catch (error) {
    console.error("AI Controller error:", error);
    res.status(500).json({ error: error.message });
  }
}

// Multiple resumes analyze பண்ண
async function analyzeMultiple(req, res) {
  try {
    const { jobDescription, jobTitle } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No resume files uploaded!" });
    }
    if (!jobDescription) {
      return res.status(400).json({ error: "Job description required!" });
    }

    const results = [];

    for (const file of files) {
      try {
        // Extract text
        const text = await extractText(file.path);

        // AI analyze
        const analysis = await analyzeResume(
          text,
          jobDescription,
          file.originalname
        );

        results.push({
          ...analysis,
          filename: file.originalname,
        });

        console.log(`Analyzed: ${file.originalname} - Score: ${analysis.overall_score}`);
      } catch (err) {
        console.error(`Error analyzing ${file.originalname}:`, err.message);
        results.push({
          name: file.originalname.replace(/\.[^.]+$/, ""),
          filename: file.originalname,
          overall_score: 0,
          skills_score: 0,
          experience_score: 0,
          education_score: 0,
          matched_skills: [],
          summary: "Could not analyze this resume.",
        });
      }
    }

    // Sort by overall_score
    results.sort((a, b) => b.overall_score - a.overall_score);

    res.json({
      success: true,
      jobTitle: jobTitle || "Untitled",
      totalResumes: results.length,
      results,
    });
  } catch (error) {
    console.error("analyzeMultiple error:", error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { analyzeOne, analyzeMultiple };