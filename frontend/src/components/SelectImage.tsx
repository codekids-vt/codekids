import React, { useState, useEffect } from "react";
import useSound from "use-sound";

interface ISelectImageActivityProps {
  question: string | undefined;
  options: { text: string; image: string }[];
  width: number;
  height: number;
}

export function SelectImageActivity({
  props,
  setAllowNext,
}: {
  props: ISelectImageActivityProps;
  setAllowNext: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { question, options } = props;
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined,
  );
  const [playCorrectSound] = useSound("/sounds/correct.wav", { volume: 0.5 });

  const handleOptionClick = (choice: string) => {
    setSelectedOption(choice);
  };

  useEffect(() => {
    if (selectedOption !== undefined) {
      // Ensure sound plays only when there is a selection
      playCorrectSound();
    }
    setAllowNext(true);
  }, [selectedOption, setAllowNext, playCorrectSound]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 pt-4">
      {question && (
        <div className="border border-gray-300 rounded-md p-4 my-4">
          <pre className="text-lg font-medium">{question}</pre>
        </div>
      )}

      <div className="flex flex-wrap justify-center space-x-4">
        {options.map(
          (option: { text: string; image: string }, index: number) => (
            <button
              key={index}
              className={`px-4 py-2 text-lg font-medium ${
                selectedOption === option.text
                  ? "bg-primary-green text-white"
                  : "bg-gray-100 text-gray-800"
              } border border-gray-300 rounded-md shadow-sm hover:outline-none hover:ring-2 hover:ring-primary-green hover:border-primary-green`}
              onClick={() => handleOptionClick(option.text)}
            >
              {option.text}
            </button>
          ),
        )}
      </div>

      {selectedOption && (
        <div className="flex flex-col flex-grow justify-center items-center relative">
          <img
            alt={selectedOption}
            src={options.find((o) => o.text === selectedOption)?.image}
            width={props.width || 400}
            height={props.height || 500}
          />
        </div>
      )}
    </div>
  );
}
