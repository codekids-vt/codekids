import React, { useState } from "react";

export interface IImageClickAnimationProps {
  image: string; // Path or URL to the image
  wrongTrickMode?: boolean; // Optional prop to control whether the "wrong trick" mode is active
}

export function ImageClickAnimation({
  image,
  wrongTrickMode = false, // Default wrongTrickMode to false if not provided
  setAllowNext,
}: {
  image: string;
  wrongTrickMode?: boolean;
  setAllowNext: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [animationType, setAnimationType] = useState<string>("freeze");

  // Handle button clicks to change animation, apply the wrong trick if wrongTrickMode is true
  const handleAnimationChange = (type: string) => {
    let appliedAnimation = type;

    if (wrongTrickMode) {
      // Swap actions for wrong trick mode
      if (type === "spin")
        appliedAnimation = "move"; // Spin triggers move
      else if (type === "move")
        appliedAnimation = "freeze"; // Move triggers freeze
      else if (type === "freeze") appliedAnimation = "spin"; // Freeze triggers spin
    }

    setAnimationType(appliedAnimation);
    setAllowNext(true); // You can allow the next activity here if needed
  };

  // Inline styles for animations
  const imageStyle: React.CSSProperties = {
    width: 200,
    height: 200,
    transition: "transform 0.5s ease-in-out",
    ...(animationType === "spin" && {
      animation: "spin 2s infinite linear",
      transformOrigin: "center",
    }),
    ...(animationType === "move" && {
      animation: "moveUpDown 1s infinite ease-in-out",
    }),
    ...(animationType === "freeze" && {
      animation: "none",
    }),
  };

  return (
    <div
      className="image-click-animation-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh", // Full viewport height to center vertically
      }}
    >
      {/* Image with dynamic inline styles */}
      <img
        src={image}
        alt="Animated"
        style={imageStyle} // Apply dynamic inline styles based on animation type
        onClick={() => setAllowNext(true)}
      />

      {/* Buttons to control the animation */}
      <div
        className="button-group mt-4"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <button
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            marginRight: "10px",
          }}
          onClick={() => handleAnimationChange("spin")}
        >
          Spin
        </button>
        <button
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            marginRight: "10px",
          }}
          onClick={() => handleAnimationChange("move")}
        >
          Move
        </button>
        <button
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
          }}
          onClick={() => handleAnimationChange("freeze")}
        >
          Freeze
        </button>
      </div>

      {/* Inline keyframes for spin and move animations */}
      <style>
        {`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          @keyframes moveUpDown {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
            100% {
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}
