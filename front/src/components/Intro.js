import React from "react";
import { TypeAnimation } from "react-type-animation";

export default function Intro() {
  const containerStyle = {
    textAlign: "center",
    padding: "60px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const titleStyle = {
    fontSize: "clamp(2rem, 5vw, 4rem)",
    fontWeight: "700",
    color: "white",
    marginBottom: "24px",
    textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
    lineHeight: "1.2",
  };

  const typeAnimationStyle = {
    fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
    display: "block",
    marginBottom: "48px",
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "400",
    lineHeight: "1.6",
    maxWidth: "800px",
    margin: "0 auto 48px auto",
  };

  const imageContainerStyle = {
    display: "flex",
    justifyContent: "center",
    margin: "0 auto",
    maxWidth: "600px",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  const imageStyling = {
    width: "100%",
    height: "auto",
    maxHeight: "400px",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  };

  const featuresStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "24px",
    marginTop: "60px",
    padding: "0 20px",
  };

  const featureCardStyle = {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "16px",
    padding: "32px 24px",
    textAlign: "center",
    transition: "all 0.3s ease",
    cursor: "pointer",
  };

  const featureIconStyle = {
    fontSize: "2.5rem",
    marginBottom: "16px",
    display: "block",
  };

  const featureTitleStyle = {
    color: "white",
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "12px",
  };

  const featureDescStyle = {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: "0.95rem",
    lineHeight: "1.5",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>RecipeMaker AI</h1>
      
      <div style={typeAnimationStyle}>
        <TypeAnimation
          sequence={[
            "Transform your ingredients into delicious recipes with AI-powered suggestions",
            2000,
            "Upload photos of your ingredients and discover personalized recipes instantly",
            2000,
            "Create gourmet dishes from your pantry staples with intelligent recommendations",
            2000,
            "Experience the future of cooking with our smart recipe generator",
            2000,
          ]}
          wrapper="span"
          speed={60}
          repeat={Infinity}
        />
      </div>

      <div 
        style={imageContainerStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-8px)";
          e.currentTarget.style.boxShadow = "0 35px 70px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 25px 50px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)";
        }}
      >
        <img
          src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Fresh ingredients and cooking"
          style={imageStyling}
        />
      </div>

      <div style={featuresStyle}>
        <div 
          style={featureCardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
          }}
        >
          <span style={featureIconStyle}>🔍</span>
          <h3 style={featureTitleStyle}>Smart Detection</h3>
          <p style={featureDescStyle}>AI-powered ingredient recognition from photos using advanced computer vision</p>
        </div>

        <div 
          style={featureCardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
          }}
        >
          <span style={featureIconStyle}>🍳</span>
          <h3 style={featureTitleStyle}>Recipe Generation</h3>
          <p style={featureDescStyle}>Personalized recipes based on your available ingredients and preferences</p>
        </div>

        <div 
          style={featureCardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
          }}
        >
          <span style={featureIconStyle}>⚡</span>
          <h3 style={featureTitleStyle}>Instant Results</h3>
          <p style={featureDescStyle}>Get recipe suggestions in seconds with nutritional information and cooking tips</p>
        </div>
      </div>
    </div>
  );
}