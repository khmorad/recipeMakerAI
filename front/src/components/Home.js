import React from 'react'
import Navbar from './Navbar'
import '../stylings/Home.css'
import Intro from './Intro'
import IngredientInputPage from "./IngredientInputPage";
import Login from './Login';
import SignUp from './Signup';
export default function Home() {
  return (
    <>
    <SignUp/>
    <Navbar/>
    <Intro/>
    <IngredientInputPage />
    </>
  );
}
