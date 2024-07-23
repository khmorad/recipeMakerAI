import React from 'react'
import Navbar from './Navbar'
import '../stylings/Home.css'
import Intro from './Intro'
import IngredientInputPage from "./IngredientInputPage";
import Login from './Login';
export default function Home() {
  return (
    <>
    <Login/>
    <Navbar/>
    <Intro/>
    <IngredientInputPage />
    </>
  );
}
