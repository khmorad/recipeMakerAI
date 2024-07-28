import React, { useState } from "react";
import "../stylings/Navbar.css";
import Login from "./Login"; // Import the Login component
import SignUp from "./SignUp"; // Import the SignUp component

const Navbar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false); // New state for Signup modal
  const [username, setUsername] = useState("");

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openSignupModal = () => setIsSignupModalOpen(true); // Function to open Signup modal
  const closeSignupModal = () => setIsSignupModalOpen(false); // Function to close Signup modal

  const handleLogin = (userName) => {
    setUsername(userName);
    closeLoginModal();
  };

  const handleLogout = () => {
    setUsername("");
  };

  const logoStyle = {
    height: "60px",
    width: "auto",
    borderRadius: "50%",
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <a href="/">
            <img src="/AIHackLogo.png" alt="Logo" style={logoStyle} />
          </a>
        </div>
        <ul className="nav-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/upload">Upload Images</a>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
        <div className="nav-right">
          {username ? (
            <button className="user-button">
              {`Welcome, ${username}!`}
              <div className="dropdown">
                <button className="dropdown-button" onClick={handleLogout}>
                  Sign Out
                </button>
              </div>
            </button>
          ) : (
            <>
              <button className="login-button" onClick={openLoginModal}>
                Login
              </button>
              <button className="signup-button" onClick={openSignupModal}>
                Signup
              </button>
            </>
          )}
        </div>
      </nav>

      {isLoginModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeLoginModal}>
              X
            </button>
            <Login onLogin={handleLogin} />
          </div>
        </div>
      )}

      {isSignupModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeSignupModal}>
              X
            </button>
            <SignUp />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
