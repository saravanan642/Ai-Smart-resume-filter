import React from "react";

function ScoreBar({ label, value }) {
  const color =
    value >= 75 ? "#27ae60" : value >= 50 ? "#f39c12" : "#e74c3c";

  return (
    <div style={{ marginBottom: "8px" }}>
      <div style={styles.scoreLabel}>
        <span>{label}</span>
        <span style={{ color, fontWeight: "bold" }}>{value}%</span>
      </div>
      <div style={styles.barBg}>
        <div
          style={{
            ...styles.barFill,
            width: `${value}%`,
            background: color,
          }}
        />
      </div>
    </div>
  );
}

function ResumeCard({ candidate, index }) {
  const rankColors = ["#FFD700", "#C0C0C0", "#CD7F32"];
  const rankColor = index < 3 ? rankColors[index] : "#888";
  const scoreColor =
    candidate.overall_score >= 75
      ? "#27ae60"
      : candidate.overall_score >= 50
      ? "#f39c12"
      : "#e74c3c";

  return (
    <div
      style={{
        ...styles.card,
        borderLeft: `5px solid ${rankColor}`,
        borderTop: index === 0 ? "2px solid #FFD700" : "1px solid #e0e0e0",
      }}
    >
      {/* Top Row */}
      <div style={styles.topRow}>
        {/* Rank */}
        <div
          style={{
            ...styles.rankBadge,
            background: `${rankColor}20`,
            border: `1px solid ${rankColor}`,
          }}
        >
          <span style={{ color: rankColor, fontWeight: "800", fontSize: "16px" }}>
            #{index + 1}
          </span>
        </div>

        {/* Name & File */}
        <div style={{ flex: 1 }}>
          <h3 style={styles.name}>{candidate.name || "Unknown"}</h3>
          <p style={styles.filename}>📄 {candidate.filename}</p>
        </div>

        {/* Score */}
        <div style={styles.scoreCircle}>
          <span style={{ color: scoreColor, fontSize: "20px", fontWeight: "800" }}>
            {candidate.overall_score}
          </span>
          <span style={{ color: "#999", fontSize: "10px" }}>/100</span>
        </div>
      </div>

      {/* Score Bars */}
      <div style={styles.scoreBars}>
        <ScoreBar label="🎯 Skills Match" value={candidate.skills_score || 0} />
        <ScoreBar label="💼 Experience" value={candidate.experience_score || 0} />
        <ScoreBar label="🎓 Education" value={candidate.education_score || 0} />
      </div>

      {/* Matched Skills */}
      {candidate.matched_skills?.length > 0 && (
        <div style={styles.skillsSection}>
          <p style={styles.skillsTitle}>✅ Matched Skills:</p>
          <div style={styles.skillTags}>
            {candidate.matched_skills.map((skill, i) => (
              <span key={i} style={styles.skillTag}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* AI Summary */}
      {candidate.summary && (
        <div style={styles.summary}>
          <p style={styles.summaryTitle}>🤖 AI Analysis:</p>
          <p style={styles.summaryText}>{candidate.summary}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "16px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    fontFamily: "Arial, sans-serif",
  },
  topRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    marginBottom: "16px",
  },
  rankBadge: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  name: {
    margin: "0 0 4px 0",
    fontSize: "16px",
    color: "#1a1a2e",
    fontWeight: "700",
  },
  filename: {
    margin: 0,
    color: "#999",
    fontSize: "12px",
  },
  scoreCircle: {
    width: "58px",
    height: "58px",
    borderRadius: "50%",
    border: "3px solid #eee",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  scoreBars: {
    marginBottom: "14px",
  },
  scoreLabel: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    marginBottom: "4px",
    color: "#555",
  },
  barBg: {
    height: "7px",
    background: "#f0f0f0",
    borderRadius: "4px",
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: "4px",
    transition: "width 0.8s ease",
  },
  skillsSection: {
    marginBottom: "12px",
  },
  skillsTitle: {
    margin: "0 0 6px 0",
    fontSize: "12px",
    fontWeight: "bold",
    color: "#333",
  },
  skillTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
  },
  skillTag: {
    background: "#eef2ff",
    color: "#667eea",
    padding: "3px 10px",
    borderRadius: "12px",
    fontSize: "11px",
    border: "1px solid #c7d2fe",
  },
  summary: {
    background: "#f8f9fa",
    borderRadius: "6px",
    padding: "10px 12px",
  },
  summaryTitle: {
    margin: "0 0 4px 0",
    fontSize: "12px",
    fontWeight: "bold",
    color: "#333",
  },
  summaryText: {
    margin: 0,
    fontSize: "12px",
    color: "#666",
    lineHeight: "1.6",
  },
};

export default ResumeCard;