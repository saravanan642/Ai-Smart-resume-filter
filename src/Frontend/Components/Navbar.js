import React from "react";

function Navbar({ currentPage, onNavigate }) {
  return (
    <div style={styles.navbar}>
      {/* Logo */}
      <div style={styles.logo} onClick={() => onNavigate("home")}>
        🤖 ResumeIQ
      </div>

      {/* Nav Links */}
      <div style={styles.links}>
        {/* Home */}
        <span
          style={{
            ...styles.link,
            color: currentPage === "home" ? "#00d4ff" : styles.inactive,
          }}
          onClick={() => onNavigate("home")}
        >
          🏠 Home
        </span>

        {/* Upload */}
        <span
          style={{
            ...styles.link,
            color: currentPage === "upload" ? "#00d4ff" : styles.inactive,
          }}
          onClick={() => onNavigate("upload")}
        >
          📤 Screen Resumes
        </span>

        {/* NEW 👉 ABOUT PAGE */}
        <span
          style={{
            ...styles.link,
            color: currentPage === "about" ? "#00d4ff" : styles.inactive,
          }}
          onClick={() => onNavigate("about")}
        >
          📄 About
        </span>
      </div>

      {/* Badge */}
      <div style={styles.badge}>MCA Final Year Project</div>
    </div>
  );
}

const styles = {
  navbar: {
    background: "linear-gradient(90deg, #1a1a2e, #16213e)",
    padding: "14px 30px",
    display: "flex",
    alignItems: "center",
    gap: "24px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    flexWrap: "wrap", // ✅ mobile support
  },

  logo: {
    color: "#00d4ff",
    fontWeight: "800",
    fontSize: "20px",
    cursor: "pointer",
    letterSpacing: "1px",
    marginRight: "auto",
  },

  links: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap", // ✅ mobile responsive
  },

  link: {
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.3s ease",
  },

  inactive: "rgba(255,255,255,0.6)",

  badge: {
    background: "rgba(0,212,255,0.1)",
    border: "1px solid rgba(0,212,255,0.3)",
    color: "#00d4ff",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "11px",
  },
};

export default Navbar;