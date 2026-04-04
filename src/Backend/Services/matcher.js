const https = require("https");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function analyzeResume(resumeText, jobDescription, filename) {
  const prompt = `You are an expert HR recruiter and resume analyst.

JOB DESCRIPTION:
${jobDescription}

RESUME CONTENT (file: ${filename}):
${resumeText.slice(0, 3000)}

Analyze this resume against the job description and return ONLY valid JSON (no markdown, no explanation):
{
  "name": "candidate full name or Unknown",
  "overall_score": <0-100>,
  "skills_score": <0-100>,
  "experience_score": <0-100>,
  "education_score": <0-100>,
  "matched_skills": ["skill1", "skill2"],
  "summary": "2-3 sentence evaluation of this candidate"
}`;

  return new Promise((resolve) => {
    const body = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    });

    const options = {
      hostname: "generativelanguage.googleapis.com",
      path: `/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        try {
          const response = JSON.parse(data);
          const raw = response.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
          const clean = raw.replace(/```json|```/g, "").trim();
          const result = JSON.parse(clean);
          resolve(result);
        } catch (err) {
          console.error("Parse error:", err.message);
          resolve({
            name: filename.replace(/\.[^.]+$/, ""),
            overall_score: 0,
            skills_score: 0,
            experience_score: 0,
            education_score: 0,
            matched_skills: [],
            summary: "Could not analyze this resume.",
          });
        }
      });
    });

    req.on("error", (err) => {
      console.error("API error:", err.message);
      resolve({
        name: filename.replace(/\.[^.]+$/, ""),
        overall_score: 0,
        skills_score: 0,
        experience_score: 0,
        education_score: 0,
        matched_skills: [],
        summary: "API connection failed.",
      });
    });

    req.write(body);
    req.end();
  });
}

module.exports = { analyzeResume };