import React, { useState } from "react";

interface ClothingActivityProps {
  showIOLabels: boolean;
  question: string | undefined;
  options: { text: string; image: string }[];
  width: number;
  height: number;
  baseLayer: string;
}

export function ClothingActivity({
  props,
  setAllowNext,
}: {
  props: ClothingActivityProps;
  setAllowNext: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { question, options, showIOLabels } = props;
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionClick = (choice: string) => {
    // if string is present in selected options array, unadd  choice to selected options else add it
    choice =
      options.find(
        (option: { text: string; image: string }) => option.text === choice,
      )?.text || "";

    if (selectedOptions.find((selectedOption) => selectedOption === choice)) {
      setSelectedOptions(
        selectedOptions.filter((selectedOption) => selectedOption !== choice),
      );
    } else {
      setSelectedOptions([...selectedOptions, choice]);
    }
  };

  React.useEffect(() => {
    const all = selectedOptions.length === options.length;
    setAllowNext(all);
  }, [selectedOptions, setAllowNext, options.length]);

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
        {options.map(
          (option: { text: string; image: string }, index: number) => (
            <button
              key={index}
              className={`px-4 py-2 text-lg font-medium ${
                //if in the selected options array
                selectedOptions.find(
                  (selectOption) => selectOption === option.text,
                ) // could use includes as well, selectedOption.includes(option.text)
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

      {selectedOptions && (
        <div className="flex flex-row items-center justify-center space-x-4">
          <div className="flex flex-col items-center justify-center space-y-2">
            <p className="text-lg font-medium">Output</p>
          </div>
        </div>
      )}

      <div className="my-4">
        <img
          src={props.baseLayer}
          alt=""
          className="h-96 w-96 rounded-md shadow-md justify-center left-40"
        />

        {selectedOptions &&
          selectedOptions.map((currentElement, index) => (
            <div
              className="flex flex-col flex-grow justify-center items-center relative"
              key={index}
            >
              <img
                key={currentElement}
                src={
                  options.find(
                    (option: { text: string; image: string }) =>
                      option.text === currentElement,
                  )?.image || ""
                }
                alt="option"
                className={`max-w-100 max-h-100 rounded-md absolute ${
                  currentElement === "Bow" || currentElement === "Glasses"
                    ? "scale-100 bottom-0"
                    : currentElement === "Computer Sticker"
                      ? "scale-50 absolute bottom-1/4"
                      : currentElement === "CoStar Logo"
                        ? "scale-100 bottom-10 absolute"
                        : currentElement === "Water Bottle"
                          ? "scale-75 bottom-28 left-24"
                          : currentElement === "Laptop"
                            ? "scale-50 bottom-32 right-9"
                            : "scale-50"
                }`}
                width={props.width || 400}
                height={props.height || 500}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
