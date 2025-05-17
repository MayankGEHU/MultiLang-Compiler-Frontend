import React from 'react';
import './HeroBox.css';

function LangSupportSection() {
  return (
    <div className="HeroBoxSecion-main">
      <div className="HeroBoxSecion-box">
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="logo" />
            <input type="text" placeholder="Search" />
          </div>
          <ul className="sidebar-menu">
            <li>🌱 New Leaf</li>
            <li className="active">📁 Sites</li>
            <li>🔧 Builds</li>
            <li>🔌 Connect</li>
            <li>🧩 Extensions</li>
            <li>🌐 Domains</li>
            <li>👥 Members</li>
            <li>📝 Audit log</li>
            <li>⚙️ Team settings</li>
            <li>🖋 Visual editor dashboard</li>
          </ul>
        </div>
        <div className="deploy-log">
          <h3>Deploy log</h3>
          <div className="log-item"><span className="status" /> Complete</div>
          <div className="log-item"><span className="status" /> Complete</div>
          <div className="log-item"><span className="status" /> Complete</div>
          <div className="terminal">
            <code>
              <div><span className="line-number">1</span> 🚀 Astro v5</div>
              <div><span className="line-number">2</span> 🧱 Storyblok 487 new nodes</div>
              <div><span className="line-number">3</span> Finished processing build request</div>
              <div><span className="line-number">4</span> Deploying new-leaf-storefront to production</div>
              <div><span className="line-number">5</span> Site is live ✨</div>
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LangSupportSection;
