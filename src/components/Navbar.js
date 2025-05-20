import React, { useEffect, useState } from 'react';
import './Navbar.css';
import Logo from "../assets/logo.png"

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="navbar-outer">
      <div className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
        <nav className="navbar">
          <div className="navbar-logo">
           <h3> Multi Lang Compiler</h3>
          </div>

          <ul className="navbar-links">
            <li>Backend is not Deployed...</li>
          </ul>

          <div className="navbar-right">
            <button className="request-btn">
             <img 
             width= "40px"
             src={Logo} alt=''/> 
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
