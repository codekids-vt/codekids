import React, { useState } from "react";

interface colorState {
  pattern: string[];
  userInput: string[];
  message: string;
}

export function ColorPattern() {
  const [pattern, setPattern] = useState(["red", "red", "blue", "blue"]);
  const [userInput, setUserInput] = useState([""]);
  const [message, setMessage] = useState("Repeat the pattern!");

  const handleColorSelection = (color: string) => {
    // const { pattern, userInput } = this.state;

    if (color === pattern[userInput.length]) {
      const newUserInput = [...userInput, color];
      setUserInput(newUserInput);

      if (newUserInput.length === pattern.length) {
        setMessage("Great job! You completed the pattern.");
      }
    } else {
      setMessage("Oops! Try again.");
      setUserInput([]);
    }
  };

  const renderCurrentPattern = () => {
    return userInput.map((color: string, i: number) => (
      <button
        className={`font-bold py-2 px-4 rounded text-${color}-500`}
        key={`userPattern-${i}`}
        disabled
      >
        {color}
      </button>
    ));
  };

  const renderColorButtons = () => {
    const colors = ["red", "green", "blue", "yellow", "orange", "purple"];

    return colors.map((color: string, i: number) => (
      <button
        className={`font-bold py-2 px-4 rounded text-${color}-500`}
        key={i}
        onClick={() => handleColorSelection(color)}
      >
        {color}
      </button>
    ));
  };

  const renderResetSelection = (
    <button
      className="font-extrabold rounded mx-2"
      onClick={() => {
        setUserInput([]);
        setMessage("Repeat the pattern!");
      }}
    >
      Reset
    </button>
  );

  return (
    <div className="flex flex-col p-2">
      <h1 className="text-2xl shadow-orange-50">Color Pattern Matching</h1>
      <div className="flex flex-col">
        <div>{renderCurrentPattern()}</div>
        <div className="flex flex-row items-center">{renderColorButtons()}</div>
        <div className="flex">{renderResetSelection}</div>
      </div>
      <div className="text-xl">{message}</div>
    </div>
  );
}
