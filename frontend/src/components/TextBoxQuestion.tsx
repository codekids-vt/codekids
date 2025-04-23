import React, { useState, useEffect } from "react";
import useSound from "use-sound";

export interface ITextBoxQuestionActivityProps {
  image: string;
  prompt: string;
  correctAnswer: string;
  successMessage: string;
  failureMessage: string;
}

export function TextBoxQuestionActivity({
  props,
  setAllowNext,
}: {
  props: ITextBoxQuestionActivityProps;
  setAllowNext: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { image, prompt, correctAnswer, successMessage, failureMessage } =
    props;
  const [inputValue, setInputValue] = useState<string>(""); // Track the user input
  // Both states need to be tracked separately because if both are false, user has not submitted
  const [isWrong, setIsWrong] = useState<boolean>(false); // Track if answer is wrong
  const [isCorrect, setIsCorrect] = useState<boolean>(false); // Track if answer is correct
  const [playCorrectSound] = useSound("/sounds/correct.wav", { volume: 0.5 });
  const [playIncorrectSound] = useSound("/sounds/incorrect.mp3", {
    volume: 0.5,
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const regex = new RegExp(correctAnswer);
      if (regex.test(inputValue)) {
        setIsCorrect(true);
        playCorrectSound();
      } else {
        setIsWrong(true);
        playIncorrectSound();
      }
    }
  };

  const handleReset = () => {
    setInputValue("");
    setIsWrong(false);
    setIsCorrect(false);
    setAllowNext(false);
  };

  useEffect(() => {
    if (isCorrect) {
      setAllowNext(true);
    }
  }, [isCorrect, setAllowNext]);

  return (
    <div
      className="text-box-image-activity flex flex-col items-center justify-center"
      style={{ minHeight: "90vh" }}
    >
      <div
        className="flex justify-center items-center"
        style={{ width: "100%", height: "auto", marginBottom: "10px" }}
      >
        <img
          src={image}
          alt="custom"
          className="object-contain"
          style={{ width: 300, height: 200 }}
        />
      </div>
      <p className="text-lg" style={{ marginBottom: "10px" }}>
        {prompt}
      </p>
      <input
        type="text"
        value={inputValue}
        onChange={onInputChange}
        onKeyPress={handleKeyPress} // Trigger submission on enter
        placeholder="Enter text here"
        disabled={isWrong || isCorrect} // Disable input after submission
        className="border border-gray-300 rounded-md p-2"
        style={{ marginBottom: "10px" }}
      />
      {isCorrect && <p className="text-green-500 mt-2">{successMessage}</p>}
      {isWrong && <p className="text-red-500 mt-2">{failureMessage}</p>}
      <button
        onClick={handleReset}
        className="bg-red-500 text-white rounded-md px-4 py-2 mt-4"
      >
        Reset
      </button>
    </div>
  );
}
