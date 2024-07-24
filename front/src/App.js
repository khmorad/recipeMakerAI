import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ImageUpload from "./components/ImageUpload";
import Home from "./components/Home";
import SignUp from "./components/Signup";

// Links separate page (similar to href in html)
function App() {
  console.log(process.env.REACT_APP_API_KEY);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<ImageUpload />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
