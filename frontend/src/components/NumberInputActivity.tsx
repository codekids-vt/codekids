import React, { Dispatch, SetStateAction, useState } from "react";

export interface INumberInputActivityProps {
  showIOLabels: boolean;
  question: string | undefined;
  options: number[];
  ans: number[];
}

export function NumberInputActivity({
  props,
  setAllowNext,
}: {
  props: any | INumberInputActivityProps;
  setAllowNext: Dispatch<SetStateAction<boolean>>;
}) {
  const { question, options, ans, showIOLabels } = props;
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [result, setResult] = useState("");

  const handleOptionClick = (choice: number) => {
    setSelectedOption(choice);
    setResult(choice === ans[0] ? "Correct!" : "Incorrect! Try again.");
  };

  React.useEffect(() => {
    setAllowNext(selectedOption === ans[0]);
  }, [selectedOption]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
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
              selectedOption === option
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
