"use client";
import { useState } from "react";

export interface ICodeCompleteProps {
  beforeCode: string;
  afterCode: string;
  answer: string;
  choices: string[];
}

export function CodeComplete(props: ICodeCompleteProps) {
  const { beforeCode, afterCode, answer, choices } = props;
  const [selectedOption, setSelectedOption] = useState("");
  const [previewCode, setPreviewCode] = useState("____");
  const [result, setResult] = useState("");

  const handleOptionClick = (choice: string) => {
    setSelectedOption(choice);
    setPreviewCode(choice);
  };

  const handleSubmit = () => {
    setResult(selectedOption === answer ? "Correct!" : "Incorrect! Try again.");
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="border border-gray-300 rounded-md p-4 my-4">
        <pre className="text-lg font-medium">
          {beforeCode + " " + previewCode + " " + afterCode}{" "}
        </pre>
      </div>
      <div className="flex flex-wrap justify-center space-x-4">
        {choices.map((choice, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-lg font-medium ${
              selectedOption === choice
                ? "bg-primary-green text-white"
                : "bg-gray-100 text-gray-800"
            } border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green`}
            onClick={() => handleOptionClick(choice)}
          >
            {choice}
          </button>
        ))}
      </div>
      <button
        className="px-4 py-2 text-lg font-medium bg-primary-green text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <p className="text-lg font-medium">{result}</p>
    </div>
  );
}
