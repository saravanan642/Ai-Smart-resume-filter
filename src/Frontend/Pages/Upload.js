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
      setError("Please enter the job description");
      return;
    }

    if (files.length === 0) {
      setError("Please upload at least one resume");
      return;
    }

    setLoading(true);
    setError("");
    setProgress(`${files.length} resumes are being analyzed... please wait`);

    try {
      const result = await uploadResumes(jobTitle, jobDescription, files);

      console.log("API Response:", result); // 🔥 debug

      if (result && result.success) {
        setError(""); // clear error
        onResults(result.results);
      } else {
        setError(result?.error || "Something went wrong!");
      }

    } catch (err) {
      console.error("Full Error:", err);

      // 🔥 FIXED ERROR HANDLING
      if (err.response) {
        setError(err.response.data?.error || "Server error occurred");
      } else {
        setError("Backend not reachable. Check server.");
      }
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
          Upload resumes - AI will automatically rank them!
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
          placeholder="Paste the job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <p style={styles.hint}>{jobDescription.length} characters</p>
      </div>

      {/* File Upload */}
      <div style={styles.card}>
        <label style={styles.label}>📄 Resumes Upload*</label>
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
  },
  subtitle: {
    color: "#666",
  },
  card: {
    background: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "20px",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "10px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "10px",
  },
  textarea: {
    width: "100%",
    minHeight: "120px",
    padding: "10px",
  },
  hint: {
    fontSize: "12px",
    textAlign: "right",
  },
  fileInput: {
    width: "100%",
    padding: "10px",
  },
  fileList: {
    marginTop: "10px",
  },
  fileCount: {
    color: "green",
    fontWeight: "bold",
  },
  fileItem: {
    fontSize: "13px",
  },
  error: {
    background: "#ffe6e6",
    padding: "10px",
    color: "red",
  },
  progress: {
    background: "#e6f2ff",
    padding: "10px",
    color: "blue",
  },
  button: {
    width: "100%",
    padding: "14px",
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
  },
};

export default UploadPage;