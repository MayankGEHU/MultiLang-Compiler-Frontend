import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-main-container">
      <div className="footer-content">
        <div className="footer-left-section">
          <h2 className="footer-logo">Multi Lang Compiler</h2>
          <p className="footer-description">
           Hello my name is mayank singh and i'm building online
           Compiler for c++, python, java etc.
          </p>
        </div>

        <div className="footer-links-section">
          <div className="footer-link-column">
            <h4>Sections</h4>
            <a href="#">HeroSection</a>
            <a href="#">PromoSection</a>
            <a href="#">features</a>
            <a href="#">Footer</a>
          </div>
          <div className="footer-link-column">
            <h4>Language Supported</h4>
            <a href="#">C</a>
            <a href="#">C++</a>
            <a href="#">Java</a>
            <a href="#">JavaScript</a>
            <a href="#">Python</a>
            <a href="#">C Sharp</a>
          </div>
          <div className="footer-link-column">
            <h4>Language Supported</h4>
            <a href="#">Html</a>
            <a href="#">Php</a>
          </div>
          <div className="footer-link-column">
            <h4>Extra Links</h4>
            <a href="#">GitHub</a>
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-detail">
        <p>© Copyright 2025, All Rights Reserved by Multi Lang Compiler</p>
        {/* <div className="social-icons">
          <span>🐦</span>
          <span>📘</span>
          <span>📷</span>
          <span>💻</span>
        </div> */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
