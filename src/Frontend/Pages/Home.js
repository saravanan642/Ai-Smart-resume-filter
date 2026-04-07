import React from "react";

function Home({ onStart }) {
  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.badge}>🤖 AI Powered</div>
        <h1 style={styles.title}>
          Smart Resume Screening &<br />
          <span style={styles.highlight}>Candidate Ranking System</span>
        </h1>
        <p style={styles.subtitle}>
          Upload resumes, provide job description — AI automatically
          analyzes and ranks the best candidates for you!
        </p>
        <button style={styles.startBtn} onClick={onStart}>
          🚀 Start Screening
        </button>
      </div>

      {/* Features — Click பண்ணா Upload page போகும் */}
      <div style={styles.featuresRow}>
        <div style={{ ...styles.featureCard, cursor: "pointer" }} onClick={onStart}>
          <div style={styles.featureIcon}>📄</div>
          <h3 style={styles.featureTitle}>PDF Upload</h3>
          <p style={styles.featureText}>
            Multiple resumes upload பண்ணலாம். PDF & TXT supported.
          </p>
          <div style={styles.clickHint}>Click to Upload →</div>
        </div>

        <div style={{ ...styles.featureCard, cursor: "pointer" }} onClick={onStart}>
          <div style={styles.featureIcon}>🤖</div>
          <h3 style={styles.featureTitle}>AI Analysis</h3>
          <p style={styles.featureText}>
            Google Gemini AI ஒவ்வொரு resume-யும் analyze பண்ணி score போடும்.
          </p>
          <div style={styles.clickHint}>Click to Start →</div>
        </div>

        <div style={{ ...styles.featureCard, cursor: "pointer" }} onClick={onStart}>
          <div style={styles.featureIcon}>🏆</div>
          <h3 style={styles.featureTitle}>Auto Ranking</h3>
          <p style={styles.featureText}>
            Skills, Experience, Education based-ஆ candidates rank ஆகும்.
          </p>
          <div style={styles.clickHint}>Click to View →</div>
        </div>
      </div>

      {/* How it works */}
      <div style={styles.stepsSection}>
        <h2 style={styles.stepsTitle}>எப்படி Use பண்றது?</h2>
        <div style={styles.stepsRow}>
          {[
            { num: "1", text: "Job Description paste பண்ணுங்க" },
            { num: "2", text: "Resumes upload பண்ணுங்க" },
            { num: "3", text: "AI analyze பண்ணும்" },
            { num: "4", text: "Ranked results பாருங்க" },
          ].map((step) => (
            <div key={step.num} style={styles.stepItem}>
              <div style={styles.stepNum}>{step.num}</div>
              <p style={styles.stepText}>{step.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p>AI-Based Smart Resume Screening System</p>
        <p style={{ color: "#999", fontSize: "12px" }}>
          MCA Final Year Project • Powered by Google Gemini AI
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    background: "#f0f2f5",
    minHeight: "100vh",
  },
  hero: {
    background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
    color: "#fff",
    textAlign: "center",
    padding: "80px 20px 60px",
  },
  badge: {
    display: "inline-block",
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.3)",
    padding: "6px 16px",
    borderRadius: "20px",
    fontSize: "13px",
    marginBottom: "20px",
    letterSpacing: "1px",
  },
  title: {
    fontSize: "clamp(24px, 5vw, 42px)",
    fontWeight: "800",
    lineHeight: "1.3",
    marginBottom: "16px",
  },
  highlight: {
    color: "#00d4ff",
  },
  subtitle: {
    fontSize: "16px",
    color: "rgba(255,255,255,0.75)",
    maxWidth: "500px",
    margin: "0 auto 32px",
    lineHeight: "1.7",
  },
  startBtn: {
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#fff",
    border: "none",
    padding: "16px 40px",
    borderRadius: "30px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 8px 24px rgba(102,126,234,0.4)",
  },
  featuresRow: {
    display: "flex",
    gap: "20px",
    padding: "40px 30px",
    maxWidth: "900px",
    margin: "0 auto",
    flexWrap: "wrap",
  },
  featureCard: {
    flex: 1,
    minWidth: "200px",
    background: "#fff",
    borderRadius: "12px",
    padding: "28px 20px",
    textAlign: "center",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    transition: "transform 0.2s, box-shadow 0.2s",
    border: "2px solid transparent",
  },
  featureIcon: {
    fontSize: "40px",
    marginBottom: "14px",
  },
  featureTitle: {
    fontSize: "17px",
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: "10px",
  },
  featureText: {
    fontSize: "13px",
    color: "#666",
    lineHeight: "1.6",
    margin: "0 0 12px 0",
  },
  clickHint: {
    fontSize: "12px",
    color: "#667eea",
    fontWeight: "bold",
    marginTop: "8px",
  },
  stepsSection: {
    background: "#fff",
    padding: "40px 20px",
    textAlign: "center",
  },
  stepsTitle: {
    fontSize: "22px",
    color: "#1a1a2e",
    marginBottom: "28px",
  },
  stepsRow: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
    maxWidth: "800px",
    margin: "0 auto",
  },
  stepItem: {
    textAlign: "center",
    width: "150px",
  },
  stepNum: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 10px",
  },
  stepText: {
    fontSize: "13px",
    color: "#555",
    lineHeight: "1.5",
    margin: 0,
  },
  footer: {
    textAlign: "center",
    padding: "30px 20px",
    color: "#666",
    fontSize: "13px",
    lineHeight: "1.8",
  },
};

export default Home;