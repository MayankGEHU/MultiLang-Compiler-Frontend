import React from 'react';
import '../authPage/Auth.css';
import { FaGoogle } from 'react-icons/fa';

function SignUp() {
  return (
    <div className="signup-main-container">
      <div className="signup-left-side-container">
        <div className="signup-form-box">
          <h2>Create your account</h2>
          <button className="google-btn">
            <FaGoogle className="google-icon" /> Continue with Google
          </button>
          <div className="divider">
            <hr /><span>or</span><hr />
          </div>
          <input type="email" placeholder="Email" className="input" />
          <input type="password" placeholder="Password" className="input" />
          <div className="checkbox-container">
            <input type="checkbox" id="news" />
            <label htmlFor="news">Receive Semrush news and SEO tips</label>
          </div>
          <button className="create-btn">Create account</button>
          <p className="login-text">
            Already have an account? <span className="login-link">Log in</span>
          </p>
          <p className="terms-text">
            By creating your account, you agree to the
            <span className="link"> Terms of Service </span>
            and
            <span className="link"> Privacy Policy</span>.
          </p>
        </div>
      </div>

      <div className="signup-right-side-container">
        <div className="testimonial-box">
          <p className="quote-mark">“</p>
          <p className="quote-text">
            By using Semrush, my team saves a lot of time by working on the right content and in a more data-driven way.
          </p>
          <p className="quote-author">Idan Segal</p>
          <p className="quote-role">Organic Growth Lead</p>
          <p className="quote-company">WIX.com</p>
          <div className="brand-logos">
            <span>TESLA</span>
            <span>Airbnb</span>
            <span>Forbes</span>
            <span>Walmart</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
