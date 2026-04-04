import React from "react";

function ScoreBar({ label, value }) {
  const color =
    value >= 75 ? "#27ae60" : value >= 50 ? "#f39c12" : "#e74c3c";

  return (
    <div style={{ marginBottom: "10px" }}>
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

function CandidateCard({ candidate, index }) {
  const rankColors = ["#FFD700", "#C0C0C0", "#CD7F32"];
  const rankColor = index < 3 ? rankColors[index] : "#888";
  const scoreColor =
    candidate.overall_score >= 75
      ? "#27ae60"
      : candidate.overall_score >= 50
      ? "#f39c12"
      : "#e74c3c";

  return (
    <div style={{
      ...styles.card,
      borderLeft: `5px solid ${rankColor}`,
    }}>
      {/* Top Row */}
      <div style={styles.cardTop}>
        <div style={styles.rankBadge}>
          <span style={{ color: rankColor, fontSize: "20px", fontWeight: "800" }}>
            #{index + 1}
          </span>
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={styles.candidateName}>{candidate.name}</h3>
          <p style={styles.filename}>📄 {candidate.filename}</p>
        </div>
        <div style={styles.scoreCircle}>
          <span style={{ color: scoreColor, fontSize: "22px", fontWeight: "800" }}>
            {candidate.overall_score}
          </span>
          <span style={{ color: "#999", fontSize: "11px" }}>/100</span>
        </div>
      </div>

      {/* Score Bars */}
      <div style={styles.scoreBars}>
        <ScoreBar label="🎯 Skills Match" value={candidate.skills_score} />
        <ScoreBar label="💼 Experience" value={candidate.experience_score} />
        <ScoreBar label="🎓 Education" value={candidate.education_score} />
      </div>

      {/* Matched Skills */}
      {candidate.matched_skills?.length > 0 && (
        <div style={styles.skillsSection}>
          <p style={styles.skillsTitle}>✅ Matched Skills:</p>
          <div style={styles.skillTags}>
            {candidate.matched_skills.map((skill, i) => (
              <span key={i} style={styles.skillTag}>{skill}</span>
            ))}
          </div>
        </div>
      )}

      {/* AI Summary */}
      {candidate.summary && (
        <div style={styles.summary}>
          <p style={styles.summaryTitle}>🤖 AI Summary:</p>
          <p style={styles.summaryText}>{candidate.summary}</p>
        </div>
      )}
    </div>
  );
}

function ResultsPage({ results, onBack }) {
  const avgScore = Math.round(
    results.reduce((a, c) => a + c.overall_score, 0) / results.length
  );

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>📊 Ranking Results</h1>
        <p style={styles.subtitle}>
          {results.length} candidates analyzed • AI-powered ranking
        </p>
      </div>

      {/* Stats */}
      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <div style={{ ...styles.statValue, color: "#27ae60" }}>
            {results[0]?.overall_score}/100
          </div>
          <div style={styles.statLabel}>Top Score</div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statValue, color: "#667eea" }}>
            {avgScore}/100
          </div>
          <div style={styles.statLabel}>Average Score</div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statValue, color: "#764ba2" }}>
            {results.length}
          </div>
          <div style={styles.statLabel}>Total Screened</div>
        </div>
      </div>

      {/* Candidate Cards */}
      {results.map((candidate, index) => (
        <CandidateCard key={index} candidate={candidate} index={index} />
      ))}

      {/* Back Button */}
      <button style={styles.backBtn} onClick={onBack}>
        ← New Screening பண்ணு
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "750px",
    margin: "0 auto",
    padding: "30px 20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "24px",
  },
  title: {
    fontSize: "26px",
    color: "#1a1a2e",
    marginBottom: "6px",
  },
  subtitle: {
    color: "#666",
    fontSize: "14px",
  },
  statsRow: {
    display: "flex",
    gap: "16px",
    marginBottom: "28px",
  },
  statCard: {
    flex: 1,
    background: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "10px",
    padding: "16px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  statValue: {
    fontSize: "22px",
    fontWeight: "800",
    marginBottom: "4px",
  },
  statLabel: {
    color: "#999",
    fontSize: "12px",
  },
  card: {
    background: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  cardTop: {
    display: "flex",
    alignItems: "flex-start",
    gap: "14px",
    marginBottom: "16px",
  },
  rankBadge: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: "#f8f9fa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  candidateName: {
    margin: "0 0 4px 0",
    fontSize: "16px",
    color: "#1a1a2e",
  },
  filename: {
    margin: 0,
    color: "#999",
    fontSize: "12px",
  },
  scoreCircle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "60px",
    height: "60px",
    border: "3px solid #eee",
    borderRadius: "50%",
    flexShrink: 0,
  },
  scoreBars: {
    marginBottom: "14px",
  },
  scoreLabel: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
    marginBottom: "4px",
    color: "#555",
  },
  barBg: {
    height: "8px",
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
    margin: "0 0 8px 0",
    fontSize: "13px",
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
    fontSize: "12px",
    border: "1px solid #c7d2fe",
  },
  summary: {
    background: "#f8f9fa",
    borderRadius: "6px",
    padding: "12px",
  },
  summaryTitle: {
    margin: "0 0 6px 0",
    fontSize: "13px",
    fontWeight: "bold",
    color: "#333",
  },
  summaryText: {
    margin: 0,
    fontSize: "13px",
    color: "#666",
    lineHeight: "1.6",
  },
  backBtn: {
    width: "100%",
    padding: "12px",
    background: "#f8f9fa",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer",
    marginTop: "10px",
    color: "#555",
  },
};

export default ResultsPage;