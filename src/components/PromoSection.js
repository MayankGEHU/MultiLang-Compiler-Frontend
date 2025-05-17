import React from "react";
import { BiCodeAlt } from "react-icons/bi";
import "./PromoSection.css";
import { useNavigate } from "react-router-dom";

const PromoSection = () => {
  const navigate = useNavigate();

  const HandleCode = () => {
    navigate("/codeshare");
  };

  return (
    <div className="promo-container">
      <div className="promo-left">
        <h1 className="promo-heading">
          Code, <br />
          <span className="highlight"> compile</span>
          <span className="underscore">_</span> <br />
          and conquer the web.
        </h1>
        <p className="promo-subtext">
          Share code instantly with your friends using real-time collaboration.{" "}
          <br />
          Edit together, run code live, and brainstorm ideas — all in one
          powerful web-based compiler. <br />
          Whether you're debugging, learning, or building something cool, it's
          better with friends.
        </p>
        <div className="promo-buttons">
          <button className="promo-btn" onClick={HandleCode}>
            Real Time code Sharing.
          </button>
        </div>
      </div>

      <div className="promo-codeblock">
        <div className="codeblock-header">
          <div className="codeblock-title">
            <BiCodeAlt className="code-icon" />
            <span>Online Multi Language Compiler</span>
          </div>
          <div className="codeblock-icons">
            <div className="code-dot red"></div>
            <div className="code-dot yellow"></div>
            <div className="code-dot green"></div>
          </div>
        </div>
        <pre className="code-snippet">
          <code className="language-js">
            {`export function `}
            <span className="code-func">Introduction</span>
            {`({ layout }) {
  `}
            <span className="code-keyword">const</span>
            {` name = `}
            <span className="code-string">"Mayank Singh"</span>
            {`;
  `}
            <span className="code-keyword">const</span>
            {` role = `}
            <span className="code-string">"Full Stack Developer"</span>
            {`;
  `}
            <span className="code-keyword">const</span>
            {` interests = [`}
            <span className="code-string">"Web Dev"</span>
            {`, `}
            <span className="code-string">"DSA"</span>
            {`, `}
            <span className="code-string">"Open Source"</span>
            {`];

  `}
            <span className="code-keyword">return</span>
            {` (
    <div className="intro">
      <h1>Hello, I'm {name} 👋</h1>
      <h2>{role}</h2>
      <p>Passionate about {interests.join(', ')}</p>
    </div>
  );
}`}
          </code>
        </pre>
        <div className="deploy-button">Code your ideas, instantly, online.</div>
      </div>
    </div>
  );
};

export default PromoSection;
