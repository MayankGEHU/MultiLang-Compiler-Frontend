import React from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSection.css";

function HeroSection() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/compiler");
  };

  return (
    <div className="hero-container">
      <h1>
        Code online with <span className="highlight">Multi Lang Compiler.</span>
      </h1>
      <p>Your code, your rules, no downloads needed.</p>

      <div className="hero-buttons">
        <button className="get-started" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
