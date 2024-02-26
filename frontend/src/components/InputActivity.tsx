import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { handleInteraction } from "../util/interaction";

export interface IInputActivityProps {
  showIOLabels: boolean;
  question: string | undefined;
  options: number[];
  ans: number | number[];
  initialImage: string;
  correctImage: string;
}

export function InputActivity({
  props,
  setAllowNext,
}: {
  props: any | IInputActivityProps;
  setAllowNext: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { question, options, ans, showIOLabels, initialImage, correctImage } =
    props;
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [result, setResult] = useState("");
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [currentImage, setCurrentImage] = useState(initialImage);
  const { user } = useAuth();
  const startTime = new Date().getTime();

  useEffect(() => {
    setAllowNext(answeredCorrectly);
  }, [answeredCorrectly, setAllowNext]);

  const handleOptionClick = (choice: number) => {
    const timeSpent = Math.round((new Date().getTime() - startTime) / 1000);
    if (!answeredCorrectly) {
      setSelectedOption(choice);
      if (Array.isArray(ans) && ans.includes(choice)) {
        setResult("Correct!");
        handleInteraction("Correct", timeSpent, user?.id)
        setCurrentImage(correctImage);
        setAnsweredCorrectly(true);
      } else if (choice === ans) {
        setResult("Correct!");
        handleInteraction("Correct", timeSpent, user?.id)
        setCurrentImage(correctImage);
        setAnsweredCorrectly(true);
      } else {
        setResult("Incorrect! Try again.");
        handleInteraction("Incorrect", timeSpent, user?.id)
        setAnsweredCorrectly(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="my-4">
        <img
          src={currentImage}
          alt="Activity"
          className="max-w-100 max-h-100 rounded-md shadow-md"
          width={props.width || 400}
          height={props.height || 500}
        />
      </div>

      {question && (
        <div className="border border-gray-300 rounded-md p-4 my-4">
          <pre className="text-lg font-medium">{question} </pre>
        </div>
      )}

      {showIOLabels && (
        <div className="flex flex-row items-center justify-center space-x-4">
          <div className="flex flex-col items-center justify-center space-y-2">
            <p className="text-lg font-medium">Input</p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-center space-x-4">
        {options.map((option: number, index: number) => (
          <button
            key={index}
            className={`px-4 py-2 text-lg font-medium ${
              (selectedOption === option || answeredCorrectly) && option === ans
                ? "bg-primary-green text-white"
                : "bg-gray-100 text-gray-800"
            } border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {showIOLabels && (
        <div className="flex flex-row items-center justify-center space-x-4">
          <div className="flex flex-col items-center justify-center space-y-2">
            <p className="text-lg font-medium">Output</p>
          </div>
        </div>
      )}

      {result && (
        <div className={`border border-gray-300 rounded-md p-4 `}>
          <p className="text-lg font-medium">{result}</p>
        </div>
      )}
    </div>
  );
}
