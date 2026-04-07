import React, { useState } from "react";
import ResumeCard from "../Components/ResumeCard";

function Dashboard({ results, onBack }) {
  const [filter, setFilter] = useState("all");

  if (!results || results.length === 0) {
    return (
      <div style={styles.empty}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>📭</div>
        <h3 style={{ color: "#555" }}>No results found</h3>
        <button style={styles.backBtn} onClick={onBack}>
          ← Back to Upload
        </button>
      </div>
    );
  }

  const avgScore = Math.round(
    results.reduce((a, c) => a + c.overall_score, 0) / results.length
  );

  const topScore = results[0]?.overall_score || 0;

  const qualified = results.filter((r) => r.overall_score >= 70).length;
  const average = results.filter(
    (r) => r.overall_score >= 40 && r.overall_score < 70
  ).length;
  const poor = results.filter((r) => r.overall_score < 40).length;

  const filtered =
    filter === "qualified"
      ? results.filter((r) => r.overall_score >= 70)
      : filter === "average"
      ? results.filter((r) => r.overall_score >= 40 && r.overall_score < 70)
      : filter === "poor"
      ? results.filter((r) => r.overall_score < 40)
      : results;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>📊 Screening Dashboard</h2>
          <p style={styles.subtitle}>
            {results.length} candidates analyzed • AI-powered ranking
          </p>
        </div>
        <button style={styles.backBtn} onClick={onBack}>
          ← New Screening
        </button>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsRow}>
        <div style={{ ...styles.statCard, borderTop: "4px solid #27ae60" }}>
          <div style={{ ...styles.statValue, color: "#27ae60" }}>
            {topScore}/100
          </div>
          <div style={styles.statLabel}>🏆 Top Score</div>
        </div>
        <div style={{ ...styles.statCard, borderTop: "4px solid #667eea" }}>
          <div style={{ ...styles.statValue, color: "#667eea" }}>
            {avgScore}/100
          </div>
          <div style={styles.statLabel}>📊 Average Score</div>
        </div>
        <div style={{ ...styles.statCard, borderTop: "4px solid #27ae60" }}>
          <div style={{ ...styles.statValue, color: "#27ae60" }}>{qualified}</div>
          <div style={styles.statLabel}>✅ Qualified (70+)</div>
        </div>
        <div style={{ ...styles.statCard, borderTop: "4px solid #f39c12" }}>
          <div style={{ ...styles.statValue, color: "#f39c12" }}>{average}</div>
          <div style={styles.statLabel}>⚡ Average (40-70)</div>
        </div>
        <div style={{ ...styles.statCard, borderTop: "4px solid #e74c3c" }}>
          <div style={{ ...styles.statValue, color: "#e74c3c" }}>{poor}</div>
          <div style={styles.statLabel}>❌ Poor (Below 40)</div>
        </div>
      </div>

      {/* Score Chart */}
      <div style={styles.chartCard}>
        <h3 style={styles.chartTitle}>📈 Score Distribution</h3>
        <div style={styles.chartBars}>
          {results.slice(0, 10).map((r, i) => {
            const color =
              r.overall_score >= 70
                ? "#27ae60"
                : r.overall_score >= 40
                ? "#f39c12"
                : "#e74c3c";
            return (
              <div key={i} style={styles.barItem}>
                <div style={styles.barLabel}>
                  {r.name?.split(" ")[0] || `R${i + 1}`}
                </div>
                <div style={styles.barBg}>
                  <div
                    style={{
                      ...styles.barFill,
                      width: `${r.overall_score}%`,
                      background: color,
                    }}
                  />
                </div>
                <div style={{ ...styles.barScore, color }}>{r.overall_score}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter Buttons */}
      <div style={styles.filterRow}>
        {[
          { key: "all", label: `All (${results.length})` },
          { key: "qualified", label: `✅ Qualified (${qualified})` },
          { key: "average", label: `⚡ Average (${average})` },
          { key: "poor", label: `❌ Poor (${poor})` },
        ].map((f) => (
          <button
            key={f.key}
            style={{
              ...styles.filterBtn,
              background: filter === f.key ? "#667eea" : "#fff",
              color: filter === f.key ? "#fff" : "#555",
              borderColor: filter === f.key ? "#667eea" : "#ddd",
            }}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div style={styles.noResult}>
          இந்த category-ல candidates இல்லை
        </div>
      ) : (
        filtered.map((candidate, index) => (
          <ResumeCard
            key={index}
            candidate={candidate}
            index={results.indexOf(candidate)}
          />
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "850px",
    margin: "0 auto",
    padding: "30px 20px",
    fontFamily: "Arial, sans-serif",
  },
  empty: {
    textAlign: "center",
    padding: "80px 20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "24px",
    flexWrap: "wrap",
    gap: "12px",
  },
  title: {
    fontSize: "24px",
    color: "#1a1a2e",
    margin: "0 0 4px 0",
  },
  subtitle: {
    color: "#666",
    fontSize: "13px",
    margin: 0,
  },
  backBtn: {
    padding: "10px 20px",
    background: "#f8f9fa",
    border: "1px solid #ddd",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    color: "#555",
  },
  statsRow: {
    display: "flex",
    gap: "12px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  statCard: {
    flex: 1,
    minWidth: "120px",
    background: "#fff",
    borderRadius: "10px",
    padding: "16px 12px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
  },
  statValue: {
    fontSize: "22px",
    fontWeight: "800",
    marginBottom: "4px",
  },
  statLabel: {
    fontSize: "11px",
    color: "#888",
  },
  chartCard: {
    background: "#fff",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
  },
  chartTitle: {
    fontSize: "15px",
    color: "#1a1a2e",
    margin: "0 0 16px 0",
  },
  chartBars: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  barItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  barLabel: {
    width: "70px",
    fontSize: "12px",
    color: "#555",
    textAlign: "right",
    flexShrink: 0,
  },
  barBg: {
    flex: 1,
    height: "20px",
    background: "#f0f0f0",
    borderRadius: "4px",
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: "4px",
    transition: "width 1s ease",
  },
  barScore: {
    width: "30px",
    fontSize: "12px",
    fontWeight: "bold",
    flexShrink: 0,
  },
  filterRow: {
    display: "flex",
    gap: "8px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  filterBtn: {
    padding: "8px 16px",
    border: "1px solid #ddd",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "13px",
    fontFamily: "Arial",
    transition: "all 0.2s",
  },
  noResult: {
    textAlign: "center",
    padding: "40px",
    color: "#999",
    fontSize: "14px",
  },
};

export default Dashboard;