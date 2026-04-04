import React, { useState } from "react";
import { uploadResumes } from "../Services/api";

function UploadForm({ onResults }) {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = (newFiles) => {
    const filtered = Array.from(newFiles).filter(
      (f) => f.name.endsWith(".pdf") || f.name.endsWith(".txt")
    );
    setFiles((prev) => [...prev, ...filtered].slice(0, 15));
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!jobDescription.trim()) {
      setError("⚠️ Job Description கொடுங்க!");
      return;
    }
    if (files.length === 0) {
      setError("⚠️ குறைந்தது ஒரு resume upload பண்ணுங்க!");
      return;
    }

    setLoading(true);
    setError("");
    setProgress(`🔄 ${files.length} resumes AI analyze பண்றோம்... சிறிது நேரம் ஆகும்`);

    try {
      const result = await uploadResumes(jobTitle, jobDescription, files);
      if (result.success) {
        onResults(result.results);
      } else {
        setError(result.error || "Something went wrong!");
      }
    } catch (err) {
      setError("❌ Server connect ஆகல! Backend running-ஆ இருக்கா?");
    } finally {
      setLoading(false);
      setProgress("");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📤 Resume Upload & Screening</h2>

      {/* Job Title */}
      <div style={styles.field}>
        <label style={styles.label}>📌 Job Title</label>
        <input
          style={styles.input}
          placeholder="Example: Python Developer, Data Analyst..."
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </div>

      {/* Job Description */}
      <div style={styles.field}>
        <label style={styles.label}>📋 Job Description *</label>
        <textarea
          style={styles.textarea}
          placeholder="Job description paste பண்ணுங்க...&#10;&#10;Example:&#10;We need a Python Developer with 3+ years experience.&#10;Required: Python, Flask, REST API, MySQL&#10;Good to have: Machine Learning, Docker, AWS"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <p style={styles.charCount}>{jobDescription.length} characters</p>
      </div>

      {/* File Upload */}
      <div style={styles.field}>
        <label style={styles.label}>
          📄 Resumes Upload ({files.length}/15) *
        </label>
        <div
          style={{
            ...styles.dropZone,
            borderColor: dragOver ? "#667eea" : "#ddd",
            background: dragOver ? "#f0f2ff" : "#fafafa",
          }}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => document.getElementById("fileInput").click()}
        >
          <div style={{ fontSize: "32px", marginBottom: "8px" }}>📁</div>
          <p style={{ color: "#666", margin: 0, fontSize: "14px" }}>
            Click or Drag & Drop resumes here
          </p>
          <p style={{ color: "#999", margin: "4px 0 0", fontSize: "12px" }}>
            PDF & TXT files • Max 15 files
          </p>
        </div>
        <input
          id="fileInput"
          type="file"
          multiple
          accept=".pdf,.txt"
          style={{ display: "none" }}
          onChange={(e) => handleFiles(e.target.files)}
        />

        {/* File List */}
        {files.length > 0 && (
          <div style={styles.fileList}>
            {files.map((f, i) => (
              <div key={i} style={styles.fileItem}>
                <span>📄</span>
                <span style={{ flex: 1, fontSize: "13px" }}>{f.name}</span>
                <span style={{ color: "#999", fontSize: "11px" }}>
                  {(f.size / 1024).toFixed(0)}KB
                </span>
                <span
                  style={styles.removeBtn}
                  onClick={() => removeFile(i)}
                >
                  ✕
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Error & Progress */}
      {error && <div style={styles.error}>{error}</div>}
      {progress && <div style={styles.progress}>{progress}</div>}

      {/* Submit */}
      <button
        style={{
          ...styles.btn,
          opacity: loading ? 0.6 : 1,
          cursor: loading ? "not-allowed" : "pointer",
        }}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "⏳ AI Analyzing..." : "⚡ Analyze & Rank Candidates"}
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "680px",
    margin: "0 auto",
    padding: "30px 20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "22px",
    color: "#1a1a2e",
    marginBottom: "24px",
    textAlign: "center",
  },
  field: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#333",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    minHeight: "140px",
    padding: "10px 14px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    resize: "vertical",
    boxSizing: "border-box",
    lineHeight: "1.6",
  },
  charCount: {
    textAlign: "right",
    color: "#999",
    fontSize: "11px",
    margin: "4px 0 0",
  },
  dropZone: {
    border: "2px dashed #ddd",
    borderRadius: "8px",
    padding: "30px 20px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  fileList: {
    marginTop: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  fileItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#f8f9fa",
    border: "1px solid #e0e0e0",
    borderRadius: "6px",
    padding: "8px 12px",
  },
  removeBtn: {
    cursor: "pointer",
    color: "#e74c3c",
    fontWeight: "bold",
    padding: "0 4px",
    fontSize: "14px",
  },
  error: {
    background: "#fff5f5",
    border: "1px solid #ffcccc",
    color: "#e74c3c",
    padding: "12px",
    borderRadius: "6px",
    marginBottom: "14px",
    fontSize: "14px",
  },
  progress: {
    background: "#f0f8ff",
    border: "1px solid #b3d9ff",
    color: "#2980b9",
    padding: "12px",
    borderRadius: "6px",
    marginBottom: "14px",
    fontSize: "14px",
  },
  btn: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default UploadForm;