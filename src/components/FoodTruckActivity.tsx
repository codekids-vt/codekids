import React, { useState } from 'react';

interface IFoodTruckActivityProps {
  showIOLabels: boolean;
  question: string | undefined;
  options: { text: string; image: string }[];
}

export function FoodTruckActivity({
  props,
  setAllowNext,
}: {
  props: any | IFoodTruckActivityProps;
  setAllowNext: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { question, options, showIOLabels } = props;
  const [selectedOption, setSelectedOptions] = useState<string[]>([]);

  const handleOptionClick = (choice: string) => {
    console.log("Start of on click");
    // if string is present in selected options array, unadd  choice to selected options else add it
    choice = options.find((option: { text: string; image: string }) => option.text === choice)?.image || ''
    console.log(choice);
    if(choice == undefined) {
    //selectedOption.push(choice);
    const index = selectedOption.indexOf(choice);
      selectedOption.splice(index, 1);
    } else {
      // const index = selectedOption.indexOf(choice);
      // selectedOption.splice(index, 1);
      selectedOption.push(choice);
    }
    setSelectedOptions(selectedOption);
    console.log("End of on click");
  };

  React.useEffect(() => {
    // Notify the parent component if needed
    setAllowNext(selectedOption !== null);
  }, [selectedOption, setAllowNext]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {question && (
        <div className="border border-gray-300 rounded-md p-4 my-4">
          <pre className="text-lg font-medium">{question}</pre>
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
        {options.map((option: { text: string; image: string }, index: number) => (
          <button
            key={index}
            className={`px-4 py-2 text-lg font-medium ${
              //if in the selected options array
                options.find((option: { text: string; image: string }) => option.text === selectedOption[index])?.image || ''
                // could use includes as well, selectedOption.includes(option.text)
                ? 'bg-primary-green text-white'
                : 'bg-gray-100 text-gray-800'
            } border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-primary-green`}
            onClick={() => handleOptionClick(option.text)}
          >
            {option.text}
          </button>
        ))}
      </div>

      {selectedOption && (
        <div className="flex flex-row items-center justify-center space-x-4">
          <div className="flex flex-col items-center justify-center space-y-2">
            <p className="text-lg font-medium">Output</p>
          </div>
        </div>
      )}

    <div className="my-4">
      {selectedOption && selectedOption.map((currentElement) => (
        <img
        key={currentElement}
        
        src={options.find((option: { text: string; image: string }) => option.text === currentElement)?.image || ''}
        alt="Image"
        className="max-w-100 max-h-100 rounded-md shadow-md"
        width={props.width || 400}
        height={props.height || 500}
        />
        ))}
    </div>

    </div>
  );
}
