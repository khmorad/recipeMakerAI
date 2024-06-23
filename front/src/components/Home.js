import React from 'react'
import Navbar from './Navbar'
import '../stylings/Home.css'
import Intro from './Intro'
import IngredientInputPage from "./IngredientInputPage";
export default function Home() {
  return (
    <>
    <Navbar/>
    <Intro/>
    <IngredientInputPage />
    </>
  );
}
