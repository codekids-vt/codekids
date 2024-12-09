import React, { useState, useEffect } from "react";
import useSound from "use-sound";

export interface ITextBoxImageActivityProps {
  image: string;
  completionSound: string;
  prompt: string;
  successMessage: string;
}

export function TextBoxImageActivity({
  props,
  setAllowNext,
}: {
  props: ITextBoxImageActivityProps;
  setAllowNext: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { image, completionSound, prompt, successMessage } = props;
  const [inputValue, setInputValue] = useState<string>(""); // Track the user input
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false); // Track if input is submitted
  const [playCompletionSound] = useSound(completionSound, { volume: 0.5 });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsSubmitted(true);
      playCompletionSound();
    }
  };

  const handleReset = () => {
    setInputValue("");
    setIsSubmitted(false);
    setAllowNext(false);
  };

  useEffect(() => {
    if (isSubmitted) {
      setAllowNext(true);
    }
  }, [isSubmitted, setAllowNext]);

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
        disabled={isSubmitted} // Disable input after submission
        className="border border-gray-300 rounded-md p-2"
        style={{ marginBottom: "10px" }}
      />
      {isSubmitted && <p className="text-green-500 mt-2">{successMessage}</p>}
      <button
        onClick={handleReset}
        className="bg-red-500 text-white rounded-md px-4 py-2 mt-4"
      >
        Reset
      </button>
    </div>
  );
}
