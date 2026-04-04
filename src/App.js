import React, { useState } from "react";
import Home from "./Frontend/Pages/Home";
import Upload from "./Frontend/Pages/Upload";
import Results from "./Frontend/Pages/Results";

function App() {
  const [page, setPage] = useState("home");
  const [results, setResults] = useState(null);

  const handleStart = () => setPage("upload");

  const handleResults = (data) => {
    setResults(data);
    setPage("results");
  };

  const handleBack = () => {
    setResults(null);
    setPage("upload");
  };

  const handleHome = () => {
    setResults(null);
    setPage("home");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      {/* Navbar */}
      <div style={navStyle}>
        <span style={logoStyle} onClick={handleHome}>
          🤖 ResumeIQ
        </span>
        <span style={navLinkStyle} onClick={handleHome}>Home</span>
        <span style={navLinkStyle} onClick={() => setPage("upload")}>
          Screen Resumes
        </span>
      </div>

      {/* Pages */}
      {page === "home" && <Home onStart={handleStart} />}
      {page === "upload" && <Upload onResults={handleResults} />}
      {page === "results" && (
        <Results results={results} onBack={handleBack} />
      )}
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
  color: "#00d4ff",
  fontWeight: "800",
  fontSize: "18px",
  cursor: "pointer",
  marginRight: "auto",
  letterSpacing: "1px",
};

const navLinkStyle = {
  color: "rgba(255,255,255,0.75)",
  cursor: "pointer",
  fontSize: "14px",
};

export default App;