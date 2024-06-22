import React from 'react';
import Navbar from './Navbar';
import '../stylings/Home.css';
import Intro from './Intro';

export default function Home() {
  return (
    <>
      <Navbar />
      <Intro />
      <div style={{ marginTop: '20px', textAlign: 'center' }}>Home</div>
    </>
  );
}
