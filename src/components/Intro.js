import React from 'react'
import { TypeAnimation } from 'react-type-animation';

export default function Intro() {
    const intoStyle = {
        display: 'flex',
        justifyContent: 'center',
    }
  return (
    <div style={intoStyle}>
    <TypeAnimation
    sequence={[
      // Same substring at the start will only be typed out once, initially
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
    style={{ fontSize: '2em', display: 'inline-block' }}
    repeat={Infinity}
  />
  </div>
  )
}
