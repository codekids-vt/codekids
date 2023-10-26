import React, { useState } from 'react';

export interface ITableCompletionActivityProps {
  options: number[];
  answer: number;
}

export function TableCompletionActivity(props: ITableCompletionActivityProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [result, setResult] = useState('');

  const correctAnswer = 5;
  const options = [4, correctAnswer, 6, 7]; 

  const handleOptionClick = (choice: number) => {
    setSelectedAnswer(choice);
    setResult(choice === correctAnswer ? 'Correct!' : 'Incorrect! Try again.');
  };

  const renderTable = () => {
    const rows = [];
    const cellContents = ['Yellow Flowers', 'Pink FLowers', '1', '2', '2', '3', '3', '4', '4', '?'];
  
    for (let i = 0; i < 5; i++) {
      const cells = [];
      for (let j = 0; j < 2; j++) {
        const index = i * 2 + j; 
        cells.push(
          <td key={j}>
            <div className="flex flex-wrap justify-center space-x-4">
              <div className="text-white p-2 rounded-md shadow-sm">
                {index < cellContents.length ? cellContents[index] : '?'}
              </div>
            </div>
          </td>
        );
      }
      rows.push(<tr key={i}>{cells}</tr>);
    }
  
    return (
      <table className="border-collapse border bg-primary-green border-black">
        <tbody>{rows}</tbody>
      </table>
    );
  };
  

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {renderTable()}
      <div className="flex flex-wrap justify-center space-x-4">
        {options.map((option, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-lg font-medium ${
              selectedAnswer === option
                ? 'bg-primary-green text-white'
                : 'bg-gray-100 text-gray-800'
            } border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {result && (
        <div className={`border border-gray-300 rounded-md p-4`}>
          <p className="text-lg font-medium">{result}</p>
        </div>
      )}
    </div>
  );
}