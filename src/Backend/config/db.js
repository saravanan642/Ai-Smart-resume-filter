const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "../../resume_screener.db");
const db = new Database(dbPath);

function initializeDB() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS resumes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      job_id INTEGER,
      candidate_name TEXT,
      filename TEXT,
      file_path TEXT,
      extracted_text TEXT,
      overall_score INTEGER DEFAULT 0,
      skills_score INTEGER DEFAULT 0,
      experience_score INTEGER DEFAULT 0,
      education_score INTEGER DEFAULT 0,
      matched_skills TEXT,
      summary TEXT,
      rank_position INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (job_id) REFERENCES jobs(id)
    );
  `);
  console.log("Database initialized!");
}

module.exports = { db, initializeDB };