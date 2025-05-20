import React from 'react'
import { Link } from "react-router-dom";
import "./LangSupportSection.css";

function Features() {
  return (
    <div className='Feature-main-section'>
      <section className="feature-extension">
        <div className="feature-heading">
          <h2>Go further with powerful features</h2>
          <p>
            Code faster and smarter with a powerful online compiler — real-time
            collaboration, intelligent bug tracking, smart suggestions, and a
            multi-language editor, all in one place.
          </p>
        </div>

        <div className="features-bottom">
          <Link to="/CodeShare" className='feature-card-link'>
          <div className="feature-card">
            <span className="feature-label green">real-time collaboration</span>
            <h3>Collaborate with your friends & debug together</h3>
            <p>
              Code together instantly using Socket.io — share your workspace,
              debug live, and build projects as a team in real time.
              Pair Programming.
            </p>
          </div>
          </Link>
           <Link to="/Compiler" className='feature-card-link'>
          <div className="feature-card">
            <span className="feature-label pink">Multi-language support</span>
            <h3>Write code in your favorite language</h3>
            <p>
              Whether it's Python, JavaScript, C++, or Java — switch
              effortlessly between languages and build without limits, all in
              one powerful editor.
            </p>
          </div>
          </Link>
          <div className="feature-card">
            <span className="feature-label orange">Smart suggestions</span>
            <h3>Catch errors as you code</h3>
            <p>
              Get real-time suggestions and instant feedback — spot bugs, fix
              issues, and improve code quality with intelligent insights right
              in the editor.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Features
