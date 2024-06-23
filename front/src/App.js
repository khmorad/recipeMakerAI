import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ImageUpload from "./components/ImageUpload";
import Home from "./components/Home";
function App() {
  console.log(process.env.REACT_APP_API_KEY)
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<ImageUpload />} />
    </Routes>
  );
}

export default App;
