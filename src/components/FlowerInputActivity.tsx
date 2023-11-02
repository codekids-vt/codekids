import React, { useState } from 'react';

export interface IFlowerInputActivityProps {
  showIOLabels: boolean
  question: string | undefined
  options: number[]
  answer: number
}

export function FlowerInputActivity(props: IFlowerInputActivityProps) {
  const { question, options, answer, showIOLabels } = props;
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [result, setResult] = useState('');

  const handleOptionClick = (choice: number) => {
    setSelectedOption(choice);
    setResult(choice === answer ? 'Correct!' : 'Incorrect! Try again.');
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {question &&
        <div className="border border-gray-300 rounded-md p-4 my-4">
          <pre className="text-lg font-medium">{question} </pre>
        </div>
      }
      {showIOLabels && (
        <div className="flex flex-row items-center justify-center space-x-4">
          <div className="flex flex-col items-center justify-center space-y-2">
            <p className="text-lg font-medium">Input</p>
          </div>
        </div>)
      }
      <div className="flex flex-wrap justify-center space-x-4">
        {options.map((option, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-lg font-medium ${selectedOption === option
              ? 'bg-primary-green text-white'
              : 'bg-gray-100 text-gray-800'
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
        </div>)
      }

      {result &&
        <div className={`border border-gray-300 rounded-md p-4 `}>
          <p className="text-lg font-medium">{result}</p>
        </div>
      }
    </div>
  );
}