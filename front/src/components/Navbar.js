import React from 'react';
import '../stylings/Navbar.css'
const Navbar = () => {
  const logoStyle = {
    height: '60px',
    width: 'auto',
    borderRadius: '50%',
  }
  return (
    <nav className="navbar">
      <div className="logo">
        <a href="/"><img src="/AIHackLogo.png" alt="Logo" style={logoStyle} /></a>
      </div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/upload">Upload Images</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
