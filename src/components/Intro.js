import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import introImage from '../assets/Intro.png'; // Import your image

export default function Intro() {
  const introStyle = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',  // Set the width to 60%
    margin: '0 auto',  // Center the div horizontally
    paddingTop: '20px', // Add padding top for spacing
    boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px'
  };

  const typeAnimationStyle = {
    fontSize: '2em',
    display: 'inline-block',
    marginTop: '20px', // Add margin top for spacing between image and text
    marginBottom: '50px',
  };

  const imageStyling = {

    width: '100%',
    height: 'auto'
  }
  return (
    <div style={{ textAlign: 'center' }}>
            <div style={typeAnimationStyle}>
        <TypeAnimation
          sequence={[
            'Transform your ingredients into delicious recipes with our interactive tool!',
            1000, // wait 1s before replacing "Mice" with "Hamsters"
            'Enter your ingredients and discover personalized recipes.',
            1000,
            'Explore flavorful recipes based on your unique ingredients.',
            1000,
            'Create gourmet dishes from your pantry staples.',
            1000
          ]}
          wrapper="span"
          speed={60}
          repeat={Infinity}
        />
      </div>
      <div style={introStyle}>
        <img src={introImage} alt="Description of the image" style={imageStyling} />
      </div>

    </div>
  );
}
