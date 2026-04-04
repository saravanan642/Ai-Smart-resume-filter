import React, { useState } from "react";
import { uploadResumes } from "../Services/api";

function UploadPage({ onResults }) {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState("");

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(selected);
  };

  const handleSubmit = async () => {
    if (!jobDescription.trim()) {
      setError("Job Description கொடுங்க!");
      return;
    }
    if (files.length === 0) {
      setError("குறைந்தது ஒரு resume upload பண்ணுங்க!");
      return;
    }

    setLoading(true);
    setError("");
    setProgress(`${files.length} resumes analyze பண்றோம்... கொஞ்சம் wait பண்ணுங்க`);

    try {
      const result = await uploadResumes(jobTitle, jobDescription, files);
      if (result.success) {
        onResults(result.results);
      } else {
        setError(result.error || "Something went wrong!");
      }
    } catch (err) {
      setError("Server connect ஆகல! Backend run பண்றீங்களா?");
    } finally {
      setLoading(false);
      setProgress("");
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>🤖 AI Resume Screener</h1>
        <p style={styles.subtitle}>
          Resumes upload பண்ணுங்க — AI automatically rank பண்ணும்!
        </p>
      </div>

      {/* Job Title */}
      <div style={styles.card}>
        <label style={styles.label}>📌 Job Title</label>
        <input
          style={styles.input}
          placeholder="Example: Python Developer"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </div>

      {/* Job Description */}
      <div style={styles.card}>
        <label style={styles.label}>📋 Job Description *</label>
        <textarea
          style={styles.textarea}
          placeholder="Job description paste பண்ணுங்க...&#10;&#10;Example:&#10;We are looking for a Python Developer with 3+ years experience.&#10;Required: Python, Flask, REST API, MySQL&#10;Good to have: Machine Learning, Docker, AWS"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <p style={styles.hint}>{jobDescription.length} characters</p>
      </div>

      {/* File Upload */}
      <div style={styles.card}>
        <label style={styles.label}>📄 Resumes Upload பண்ணுங்க *</label>
        <input
          type="file"
          multiple
          accept=".pdf,.txt"
          onChange={handleFiles}
          style={styles.fileInput}
        />
        {files.length > 0 && (
          <div style={styles.fileList}>
            <p style={styles.fileCount}>✅ {files.length} files selected:</p>
            {files.map((f, i) => (
              <div key={i} style={styles.fileItem}>
                📄 {f.name} ({(f.size / 1024).toFixed(0)} KB)
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Error */}
      {error && <div style={styles.error}>⚠️ {error}</div>}

      {/* Progress */}
      {progress && <div style={styles.progress}>⏳ {progress}</div>}

      {/* Submit Button */}
      <button
        style={{
          ...styles.button,
          opacity: loading ? 0.6 : 1,
          cursor: loading ? "not-allowed" : "pointer",
        }}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "⏳ Analyzing..." : "⚡ Analyze & Rank Candidates"}
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "0 auto",
    padding: "30px 20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  title: {
    fontSize: "28px",
    color: "#1a1a2e",
    marginBottom: "8px",
  },
  subtitle: {
    color: "#666",
    fontSize: "15px",
  },
  card: {
    background: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    minHeight: "150px",
    padding: "10px 14px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
    resize: "vertical",
    boxSizing: "border-box",
    lineHeight: "1.6",
  },
  hint: {
    textAlign: "right",
    color: "#999",
    fontSize: "12px",
    marginTop: "5px",
  },
  fileInput: {
    width: "100%",
    padding: "10px",
    border: "2px dashed #ccc",
    borderRadius: "6px",
    cursor: "pointer",
    boxSizing: "border-box",
  },
  fileList: {
    marginTop: "12px",
  },
  fileCount: {
    color: "#27ae60",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  fileItem: {
    padding: "6px 10px",
    background: "#f8f9fa",
    borderRadius: "4px",
    marginBottom: "4px",
    fontSize: "13px",
    color: "#555",
  },
  error: {
    background: "#fff5f5",
    border: "1px solid #ffcccc",
    color: "#e74c3c",
    padding: "12px",
    borderRadius: "6px",
    marginBottom: "16px",
    fontSize: "14px",
  },
  progress: {
    background: "#f0f8ff",
    border: "1px solid #b3d9ff",
    color: "#2980b9",
    padding: "12px",
    borderRadius: "6px",
    marginBottom: "16px",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default UploadPage;