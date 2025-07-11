import React, { useState, useEffect } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import "../App.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const DEFAULT_TEMPLATES = {
  cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    cout << \"Hello, World!\";\n    return 0;\n}`,
  c: `#include <stdio.h>\n\nint main() {\n    printf(\"Hello, World!\\n\");\n    return 0;\n}`
};

const Compiler = () => {
  const [files, setFiles] = useState([
    { name: "Main.cpp", language: "cpp", code: DEFAULT_TEMPLATES.cpp }
  ]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [output, setOutput] = useState("");
  const [stdin, setStdin] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [showAI, setShowAI] = useState(false);
  const [aiPrompt, setAIPrompt] = useState("");
  const [aiCode, setAICode] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isFullScreen) {
        setIsFullScreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullScreen]);

  const generateUniqueName = (baseName, extension) => {
    let count = 1;
    let name = `${baseName}${count}.${extension}`;
    const fileNames = files.map(file => file.name);
    while (fileNames.includes(name)) {
      count++;
      name = `${baseName}${count}.${extension}`;
    }
    return name;
  };

  const handleAddFile = () => {
    const name = generateUniqueName("File", "cpp");
    const newFile = {
      name,
      language: "cpp",
      code: DEFAULT_TEMPLATES.cpp
    };
    setFiles([...files, newFile]);
    setActiveIndex(files.length);
  };

  const handleDeleteFile = (index) => {
    if (files.length === 1) {
      alert("At least one file must remain.");
      return;
    }
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    if (activeIndex === index) {
      setActiveIndex(index === 0 ? 0 : index - 1);
    } else if (activeIndex > index) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    const updated = [...files];
    const ext = lang === "cpp" ? "cpp" : "c";
    const oldName = updated[activeIndex].name.split(".")[0];
    updated[activeIndex].language = lang;
    updated[activeIndex].code = DEFAULT_TEMPLATES[lang];
    updated[activeIndex].name = `${oldName}.${ext}`;
    setFiles(updated);
  };

  const handleCodeChange = (value) => {
    const updated = [...files];
    updated[activeIndex].code = value;
    setFiles(updated);
  };

  const handleRun = async () => {
    const { language, code } = files[activeIndex];
    try {
      const { data } = await axios.post("http://localhost:5000/run", {
        language,
        code,
        input: stdin
      });

      if (data.error) {
        setOutput(`❌ ${data.type?.toUpperCase() || "ERROR"}:\n${data.message}`);
      } else {
        setOutput(data.output || "No output returned.");
      }
    } catch (err) {
      console.error(err);
      setOutput("An error occurred. Please check your code or server.");
    }
  };

  const handleRename = (index, newName) => {
    const trimmed = newName.trim();
    if (!trimmed || files.some((f, i) => f.name === trimmed && i !== index)) {
      alert("Invalid or duplicate filename.");
      return;
    }
    const updated = [...files];
    updated[index].name = trimmed;
    setFiles(updated);
    setEditingIndex(null);
  };

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  const activeFile = files[activeIndex];

  return (
    <div className="compiler-main">
      <div className="compiler-topbar">
        <div className="tabs">
          {files.map((file, index) => (
            <div
              key={index}
              className={`tab ${index === activeIndex ? "active" : ""}`}
            >
              {editingIndex === index ? (
                <input
                  type="text"
                  className="rename-input"
                  defaultValue={file.name}
                  onBlur={(e) => handleRename(index, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleRename(index, e.target.value);
                  }}
                  autoFocus
                />
              ) : (
                <span
                  onClick={() => setActiveIndex(index)}
                  onDoubleClick={() => setEditingIndex(index)}
                >
                  {file.name}
                </span>
              )}
              <div
                className="delete-lottie"
                onClick={() => handleDeleteFile(index)}
                title="Delete File"
              >
                <DotLottieReact
                  src="https://lottie.host/2eb521c4-4210-4675-bec1-c6f787012c2c/pNN7Bssrrb.lottie"
                  autoplay
                  loop
                  style={{ width: "24px", height: "24px" }}
                />
              </div>
            </div>
          ))}
          <div className="add-lottie" onClick={handleAddFile} title="Add File">
            <DotLottieReact
              src="https://lottie.host/6d9450ee-92e4-4944-9d57-26061c183209/whN6mWtI3a.lottie"
              autoplay
              loop
              style={{ width: "82px", height: "82px" }}
            />
          </div>
        </div>

        <span className="title">
          {activeFile.language.toUpperCase()} - {activeFile.name}
        </span>

        <div className="controls">
          <button className="ai-code-button" onClick={() => setShowAI(true)}>
            Code with AI 🤖
          </button>
          <select value={activeFile.language} onChange={handleLanguageChange}>
            <option value="cpp">C++</option>
            <option value="c">C</option>
          </select>
          <button className="run-button" onClick={handleRun}>
            RUN ▶
          </button>
          <button className="fullscreen-button" onClick={toggleFullScreen}>
            {isFullScreen ? "Exit Fullscreen ⛶" : "Fullscreen ⛶"}
          </button>
        </div>
      </div>

      <div className="compiler-body">
        <div className={`editor-container ${isFullScreen ? "fullscreen" : ""}`}>
          {isFullScreen && (
            <button
              className="exit-fullscreen-btn"
              onClick={() => setIsFullScreen(false)}
            >
              Exit Fullscreen ⛶
            </button>
          )}
          <Editor
            height={isFullScreen ? "100vh" : "500px"}
            defaultLanguage={activeFile.language}
            value={activeFile.code}
            theme="vs-dark"
            onChange={handleCodeChange}
          />
        </div>

        {!isFullScreen && (
          <div className="io-section">
            <div className="input-box">
              <h4>STDIN</h4>
              <textarea
                placeholder="Enter input (multiline supported)"
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
                rows={6}
                style={{
                  width: "97%",
                  resize: "vertical",
                  fontFamily: "monospace",
                  fontSize: "14px",
                  padding: "8px",
                  borderRadius: "6px",
                }}
              />
            </div>
            <div className="output-box">
              <h4>Output:</h4>
              <pre>{output || "Click on RUN button to see the output"}</pre>
            </div>
          </div>
        )}
      </div>

      {showAI && (
        <div className="ai-modal">
          <div className="ai-modal-content">
            <h2>Code with AI</h2>
            <textarea
              rows={4}
              placeholder="Describe the code you want..."
              value={aiPrompt}
              onChange={(e) => setAIPrompt(e.target.value)}
            />
            <button
              className="generate-btn"
              onClick={async () => {
                setLoadingAI(true);
                try {
                  const res = await axios.post("http://localhost:5000/ai-generate", {
                    prompt: aiPrompt,
                    language: activeFile.language,
                  });
                  setAICode(res.data.code);
                } catch (e) {
                  setAICode("// Failed to fetch code from AI.");
                } finally {
                  setLoadingAI(false);
                }
              }}
              disabled={loadingAI || !aiPrompt}
            >
              {loadingAI ? "Generating..." : "Generate Code"}
            </button>
            <pre className="ai-output">{aiCode || "// AI will write code here..."}</pre>
            <button
              className="copy-btn"
              onClick={() => navigator.clipboard.writeText(aiCode)}
              disabled={!aiCode}
            >
              Copy Code
            </button>
            <button className="close-btn" onClick={() => setShowAI(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Compiler;




// import React, { useState } from "react";
// import axios from "axios";
// import Editor from "@monaco-editor/react";
// import "../App.css";

// const Compiler = () => {
//   const [code, setCode] = useState(
//     `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!";\n    return 0;\n}`
//   );

//   const [language, setLanguage] = useState("cpp");
//   const [output, setOutput] = useState("");

//   const handleSubmit = async () => {
//     const payLoad = {
//       language: "cpp",
//       code,
//     };

//     try {
//       const { data } = await axios.post("https://multi-lang-compiler-backend.vercel.app/api/run", 
//         payLoad
//       );
//       setOutput(data.output);
//     } catch (err) {
//       console.log(err?.response || err);
//       setOutput("An error occurred. Please check your code or server.");
//     }
//   };

//   return (
//     <div className="compiler-main">
//       <div className="compiler-topbar">
//         <span className="tab active">Main.cpp</span>
//         <span className="title">C++ Hello World</span>
//         <div className="controls">
//           <div className="language-changer">
//             <select
//               value={language}
//               onChange={(e) => {
//                 setLanguage(e.target.value);
//                 console.log(e.target.value);
//               }}
//             >
//               <option value="cpp">Cpp</option>
//               <option value="py">Python</option>
//             </select>
//           </div>

//           <button className="run-button" onClick={handleSubmit}>
//             RUN ▶
//           </button>
//         </div>
//       </div>

//       <div className="compiler-body">
//         <div className="editor-container">
//           <Editor
//             height="500px"
//             defaultLanguage="cpp"
//             value={code}
//             theme="vs-dark"
//             onChange={(value) => setCode(value)}
//           />
//         </div>

//         <div className="io-section">
//           <div className="input-box">
//             <h4>STDIN</h4>
//             <input placeholder="Input for the program (Optional)" />
//           </div>
//           <div className="output-box">
//             <h4>Output:</h4>
//             <pre>{output || "Click on RUN button to see the output"}</pre>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Compiler;
