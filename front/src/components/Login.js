import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../stylings/Login.css"; // Make sure to import the new CSS file

export default function Login({ onLogin }) {
  const [users, setUsers] = useState([]);
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [showWelcomeCard, setShowWelcomeCard] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility

  useEffect(() => {
    // Fetch users from the server
    fetch("http://127.0.0.1:5000/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        console.log("Users:", data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    // Check if the user exists
    const user = users.find(
      (user) => user.Username === userName && user.Password === password
    );
    if (user) {
      setLoggedIn(true);
      setLoginError("");
      setShowWelcomeCard(true);
      setTimeout(() => {
        setShowWelcomeCard(false);
        onLogin(userName); // Call onLogin to update Navbar
      }, 3000); // Hide welcome card after 3 seconds
    } else {
      setLoggedIn(false);
      setLoginError("Invalid username or password");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div id="auth" className="panel">
      <div>
        <h1>RecipeMaker</h1>
      </div>
      <form onSubmit={handleLogin}>
        <label htmlFor="email" className="sr-only">
          Phone number, username or email address
        </label>
        <input
          name="email"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <div className="password-container">
          <input
            name="password"
            type={passwordVisible ? "text" : "password"} // Toggle password visibility
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? "Hide" : "Show"} {/* Toggle button text */}
          </button>
        </div>
        <button type="submit">Log In</button>
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      </form>
      {showWelcomeCard && (
        <div className="welcome-card">
          <p>Welcome, {userName}!</p>
        </div>
      )}
      <div className="panel register flex justify-content-center">
        <p>Don't have an account?</p>
        <Link to="/signup" className="signup-link">
          Sign up
        </Link>
      </div>
    </div>
  );
}
