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
        <span
          style={{
            ...styles.link,
            color: currentPage === "home" ? "#00d4ff" : "rgba(255,255,255,0.7)",
          }}
          onClick={() => onNavigate("home")}
        >
          🏠 Home
        </span>
        <span
          style={{
            ...styles.link,
            color: currentPage === "upload" ? "#00d4ff" : "rgba(255,255,255,0.7)",
          }}
          onClick={() => onNavigate("upload")}
        >
          📤 Screen Resumes
        </span>
      </div>

      {/* Badge */}
      <div style={styles.badge}>MCA Final Year Project</div>
    </div>
  );
}

const styles = {
  navbar: {
    background: "#1a1a2e",
    padding: "14px 30px",
    display: "flex",
    alignItems: "center",
    gap: "24px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  logo: {
    color: "#00d4ff",
    fontWeight: "800",
    fontSize: "20px",
    cursor: "pointer",
    letterSpacing: "1px",
    marginRight: "auto",
    fontFamily: "Arial, sans-serif",
  },
  links: {
    display: "flex",
    gap: "20px",
  },
  link: {
    cursor: "pointer",
    fontSize: "14px",
    fontFamily: "Arial, sans-serif",
    transition: "color 0.2s",
  },
  badge: {
    background: "rgba(0,212,255,0.1)",
    border: "1px solid rgba(0,212,255,0.3)",
    color: "#00d4ff",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "11px",
    letterSpacing: "0.5px",
  },
};

export default Navbar;