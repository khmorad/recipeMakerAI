import React from 'react';
import '../stylings/Navbar.css'
const Navbar = () => {
  const logoStyle = {
    height: '40px',
    width: 'auto',
    borderRadius: '50%',
  }
  return (
    <nav className="navbar">
      <div className="logo">
        <a href="#"><img src="https://1000logos.net/wp-content/uploads/2023/02/ChatGPT-Logo.png" alt="Logo" style={logoStyle} /></a>
      </div>
      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
