import React, { useState } from "react";
import { motion } from "framer-motion";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!email || !password) {
      alert("Please enter email & password");
      return;
    }
    onLogin(email, password);
  };

  return (
    <div className="flex h-screen font-sans ">

      {/* 🔥 LEFT SIDE */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex-1 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white pl-28 flex flex-col justify-center relative"
      >
        {/* Glow effect */}
        <div className="absolute w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>

        <h1 className="text-4xl font-bold mb-6">🤖 ResumeIQ</h1>

        <h2 className="text-xl mb-10">
          AI Resume Screening & Candidate Ranking
        </h2>

        <div className="space-y-4 text-lg">
          <motion.p whileHover={{ scale: 1.1 }}>📄 Upload multiple resumes</motion.p>
          <motion.p whileHover={{ scale: 1.1 }}>🤖 AI analyzes candidates</motion.p>
          <motion.p whileHover={{ scale: 1.1 }}>🏆 Auto ranking system</motion.p>
          <motion.p whileHover={{ scale: 1.1 }}>📊 Detailed scoring</motion.p>
        </div>
      </motion.div>

      {/* 🔥 RIGHT SIDE */}
      <div className="flex-1 bg-gray-100 flex items-center justify-center relative ">

        {/* Background glow */}
        <div className="absolute w-80 h-80 bg-indigo-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>

        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-white p-8 rounded-2xl w-80 shadow-2xl backdrop-blur-lg"
        >
          <h2 className="text-2xl font-semibold mb-2">
            Welcome Back 👋
          </h2>

          <p className="mb-5 text-gray-500">
            Login to continue
          </p>

          {/* EMAIL */}
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="w-full p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-md font-bold shadow-lg"
          >
            🚀 Login
          </motion.button>

          {/* Extra */}
          <p className="text-sm text-gray-400 mt-4 text-center">
            Secure AI-powered hiring system
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default LoginPage;