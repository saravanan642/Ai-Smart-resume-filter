import React, { useState } from "react";
import Login from "./Frontend/Pages/Login";
import Home from "./Frontend/Pages/Home";
import Upload from "./Frontend/Pages/Upload";
import Results from "./Frontend/Pages/Results";

function App() {
  const [page, setPage] = useState("login");
  const [results, setResults] = useState(null);

  const handleLogin = () => setPage("home");
  const handleStart = () => setPage("upload");
  const handleResults = (data) => { setResults(data); setPage("results"); };
  const handleBack = () => { setResults(null); setPage("upload"); };
  const handleHome = () => { setResults(null); setPage("home"); };
  const handleLogout = () => { setResults(null); setPage("login"); };

  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5" }}>

      {/* Navbar — Login page-ல காட்டாதே */}
      {page !== "login" && (
        <div style={navStyle}>
          <span style={logoStyle} onClick={handleHome}>🤖 ResumeIQ</span>
          <span style={linkStyle} onClick={handleHome}>🏠 Home</span>
          <span style={linkStyle} onClick={() => setPage("upload")}>📤 Screen Resumes</span>
          <span style={{ ...linkStyle, marginLeft: "auto", color: "#ff6b6b" }} onClick={handleLogout}>
            🚪 Logout
          </span>
        </div>
      )}

      {/* Pages */}
      {page === "login"   && <Login onLogin={handleLogin} />}
      {page === "home"    && <Home onStart={handleStart} />}
      {page === "upload"  && <Upload onResults={handleResults} />}
      {page === "results" && <Results results={results} onBack={handleBack} />}
    </div>
  );
}

const navStyle = {
  background: "#1a1a2e",
  padding: "14px 30px",
  display: "flex",
  alignItems: "center",
  gap: "24px",
};
const logoStyle = {
  color: "#00d4ff", fontWeight: "800", fontSize: "20px",
  cursor: "pointer", letterSpacing: "1px",
};
const linkStyle = {
  color: "rgba(255,255,255,0.75)", cursor: "pointer", fontSize: "14px",
};

export default App;