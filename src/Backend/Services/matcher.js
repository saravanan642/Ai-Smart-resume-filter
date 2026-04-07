require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const https = require("https");

// 🔥 GEMINI API KEY
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// 🔥 DEBUG
console.log("Gemini Key:", GEMINI_API_KEY);

// 🔹 JD skills extract
function extractSkillsFromJD(jobDescription) {
  const skillsList = [
    "javascript", "react", "node", "mongodb",
    "python", "java", "sql", "html", "css"
  ];

  const jd = jobDescription.toLowerCase();
  return skillsList.filter(skill => jd.includes(skill));
}

// 🔹 Experience extract
function extractExperience(text) {
  const match = text.match(/(\d+)\s+years?/i);
  return match ? parseInt(match[1]) : 0;
}

// 🔹 Education extract
function extractEducation(text) {
  const t = text.toLowerCase();

  if (t.includes("phd")) return 100;
  if (t.includes("m.tech") || t.includes("m.e")) return 90;
  if (t.includes("b.tech") || t.includes("b.e")) return 80;
  return 50;
}

// 🔹 FALLBACK AI (LOCAL)
function fallbackLogic(resumeText, jobDescription, filename) {
  const resume = resumeText.toLowerCase();

  const requiredSkills = extractSkillsFromJD(jobDescription);
  const matchedSkills = requiredSkills.filter(skill =>
    resume.includes(skill)
  );

  const skillsScore = requiredSkills.length === 0
    ? 0
    : Math.round((matchedSkills.length / requiredSkills.length) * 100);

  const years = extractExperience(resumeText);
  const experienceScore = Math.min(years * 20, 100);

  const educationScore = extractEducation(resumeText);

  const overallScore = Math.round(
    skillsScore * 0.6 +
    experienceScore * 0.25 +
    educationScore * 0.15
  );

  return {
    name: filename.replace(/\.[^.]+$/, ""),
    overall_score: overallScore,
    skills_score: skillsScore,
    experience_score: experienceScore,
    education_score: educationScore,
    matched_skills: matchedSkills,
    summary: `Matched ${matchedSkills.length}/${requiredSkills.length} skills, ${years} years experience.`,
  };
}

// 🔹 MAIN FUNCTION
async function analyzeResume(resumeText, jobDescription, filename) {

  // 🔥 If no API key → fallback only
  if (!GEMINI_API_KEY) {
    console.log("⚠️ No API key → using fallback");
    return fallbackLogic(resumeText, jobDescription, filename);
  }

  const prompt = `You are an expert HR recruiter and resume analyst.

JOB DESCRIPTION:
${jobDescription}

RESUME CONTENT (file: ${filename}):
${resumeText.slice(0, 3000)}

Return ONLY JSON:
{
  "name": "candidate name",
  "overall_score": number,
  "skills_score": number,
  "experience_score": number,
  "education_score": number,
  "matched_skills": [],
  "summary": ""
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

          const aiResult = JSON.parse(clean);

          // 🔥 ALWAYS USE FALLBACK FOR SCORE
          const fallback = fallbackLogic(resumeText, jobDescription, filename);

          resolve({
            name: aiResult.name || fallback.name,
            overall_score: fallback.overall_score,
            skills_score: fallback.skills_score,
            experience_score: fallback.experience_score,
            education_score: fallback.education_score,
            matched_skills: fallback.matched_skills,
            summary: aiResult.summary || fallback.summary
          });

        } catch (err) {
          console.error("⚠️ AI Parse error → fallback");
          resolve(fallbackLogic(resumeText, jobDescription, filename));
        }
      });
    });

    req.on("error", (err) => {
      console.error("⚠️ API error → fallback");
      resolve(fallbackLogic(resumeText, jobDescription, filename));
    });

    req.write(body);
    req.end();
  });
}

module.exports = { analyzeResume };