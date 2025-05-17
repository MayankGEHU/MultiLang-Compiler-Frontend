import React from "react";
import "./LangSupportSection.css";

import Cpp from "../assets/c-.png";
import Java from "../assets/java.png";
import Python from "../assets/python.png";
import Js from "../assets/js.png";
import Html from "../assets/html-5.png";
import Csharp from "../assets/c-sharp.png";
import Php from "../assets/php.png";
import CLang from "../assets/lang-c.png";

const languages = [
  { name: "Html", icon: <img src={Html} alt="Html" className="lang-img" /> },
  { name: "Python", icon: <img src={Python} alt="Python" className="lang-img" /> },
  { name: "JavaScript", icon: <img src={Js} alt="Js" className="lang-img" /> },
  { name: "C", icon: <img src={CLang} alt="CLang" className="lang-img" /> },
  { name: "C++", icon: <img src={Cpp} alt="C++" className="lang-img" /> },
  { name: "Java", icon: <img src={Java} alt="java" className="lang-img" /> },
  { name: "C-sharp", icon: <img src={Csharp} alt="Csharp" className="lang-img" /> },
  { name: "Php", icon: <img src={Php} alt="Php" className="lang-img" /> },
];

function LangSupportSection() {
  return (
    <div className="LangSupportSection-main">
      <div className="lang-scroll-section">
        {[0, 1].map((rowIdx) => (
          <div
            className={`lang-marquee ${rowIdx % 2 === 0 ? "left" : "right"}`}
            key={rowIdx}
          >
            <div className="lang-marquee-track">
              {[...languages, ...languages].map((lang, index) => (
                <div className="lang-box" key={index}>
                  <span>{lang.name}</span>
                  <span className="lang-icon">{lang.icon}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LangSupportSection;
