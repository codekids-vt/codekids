import React, { useState } from 'react';

export interface ITableCompletionActivityProps {
  showIOLabels: boolean;
  question: string | undefined;
  options: number[];
  answer: number;
  initialImage: string;
  correctImage: string;
}

export function TableCompletionActivity({ props }: { props: any | ITableCompletionActivityProps }) {
  const { question, options, answer, showIOLabels, initialImage, correctImage} = props;
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [result, setResult] = useState('');
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [currentImage, setCurrentImage] = useState(initialImage);


  const handleOptionClick = (choice: number) => {
    if (!answeredCorrectly) {
      setSelectedOption(choice);

      if (choice === answer) {
        setResult('Correct!');
        setCurrentImage(correctImage);
        setAnsweredCorrectly(true);
      } else {
        setResult('Incorrect! Try again.');
      }
    }
  };

  const renderTable = () => {
    const rows = [];
    const cellContents = ['Yellow Flowers', 'Pink Flowers', '1', '2', '2', '3', '3', '4', '4', '?'];
  
    for (let i = 0; i < 5; i++) {
      const cells = [];
      for (let j = 0; j < 2; j++) {
        const index = i * 2 + j; 
        cells.push(
          <td key={j} className="border border-black">
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
      <div className="my-4">
        <img
          src={currentImage}
          alt="Image"
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
        </div>)
      }
      <div className="flex flex-wrap justify-center space-x-4">
        {options.map((option: number, index: number) => (
          <button
            key={index}
            className={`px-4 py-2 text-lg font-medium ${selectedOption === option ||
              answeredCorrectly
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