import React from 'react'
import Navbar from './Navbar'
import '../stylings/Home.css'
import Intro from './Intro'
import IngredientInputPage from "./IngredientInputPage";

export default function Home() {
  return (
    <div className="home-container">
      <Navbar/>
      <div className="content-wrapper">
        <Intro/>
        <IngredientInputPage />
      </div>
    </div>
  );
}
