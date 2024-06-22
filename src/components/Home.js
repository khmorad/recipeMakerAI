import React from "react";
import Navbar from "./Navbar";
import "../stylings/Home.css";
import IngredientInputPage from "./IngredientInputPage";
export default function Home() {
  return (
    <>
      <Navbar />
      <div>Home</div>
      <IngredientInputPage />
    </>
  );
}
