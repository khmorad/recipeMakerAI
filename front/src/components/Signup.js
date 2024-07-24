import React, { useState } from "react";
import Navbar from "./Navbar";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState("");

  const handleSignUp = (event) => {
    event.preventDefault();

    // Basic validation
    if (password !== confirmPassword) {
      setSignupError("Passwords do not match");
      return;
    }

    // Prepare user data
    const userData = {
      UserID: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
      Email: email,
      Username: username,
      Password: password,
    };

    // Send POST request to create a new user
    fetch("http://127.0.0.1:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "User created successfully") {
          setSignupSuccess("Sign up successful!");
          setSignupError("");
          // Optionally, you could redirect the user to a login page or clear the form
        } else {
          setSignupError(
            "Error creating user: " + (data.error || "Unknown error")
          );
          setSignupSuccess("");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setSignupError("Error creating user");
        setSignupSuccess("");
      });
  };

  return (
    <div>
      <Navbar />
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
          {signupError && <p style={{ color: "red" }}>{signupError}</p>}
          {signupSuccess && <p style={{ color: "green" }}>{signupSuccess}</p>}
        </form>
      </div>
    </div>
  );
}
