const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");

async function extractText(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  try {
    if (ext === ".pdf") {
      // Extract text from PDF
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      return data.text || "";
    } else if (ext === ".txt") {
      // Read text file directly
      const text = fs.readFileSync(filePath, "utf-8");
      return text || "";
    } else {
      return "";
    }
  } catch (error) {
    console.error("Parse error:", error.message);
    return "";
  }
}

module.exports = { extractText };