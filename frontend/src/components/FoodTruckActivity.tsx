import React, { useState } from "react";
import useSound from "use-sound";
import { useAuth } from "../context/AuthContext";
import { handleInteraction } from "../util/interaction";

interface IFoodTruckActivityProps {
  showIOLabels: boolean;
  question: string | undefined;
  options: { text: string; image: string }[];
  width: number;
  height: number;
}

export function FoodTruckActivity({
  props,
  setAllowNext,
}: {
  props: IFoodTruckActivityProps | any;
  setAllowNext: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { question, options, showIOLabels } = props;
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [playCorrectSound] = useSound("/sounds/correct.wav", { volume: 0.5 });
  const { user } = useAuth();
  const startTime = new Date().getTime();
  const url = new URL(window.location.href);
  const pathSegments = url.pathname.split("/").filter((segment) => segment);
  const bookID = parseInt(pathSegments[1], 10);
  const pageID = parseInt(pathSegments[2], 10);

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
    if (all) {
      const timeSpent = Math.round((new Date().getTime() - startTime) / 1000);
      setAllowNext(all);
      playCorrectSound();
      handleInteraction("completed", true, timeSpent, user?.id, bookID, pageID);
    }
  }, [
    selectedOptions,
    setAllowNext,
    options.length,
    playCorrectSound,
    startTime,
    user,
  ]);

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
          src="/io_book/pizza_pizza.png"
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
                  currentElement === "Ham" || currentElement === "Onions"
                    ? "scale-75 bottom-20"
                    : currentElement === "Bacon"
                      ? "scale-100 scale-x-75 scale-y-125 bottom-20"
                      : currentElement === "Pineapple"
                        ? "scale-50 bottom-2"
                        : currentElement === "Mushrooms" ||
                            currentElement === "Green Onions"
                          ? "scale-50 scale-y-100 bottom-16"
                          : currentElement === "Chicken"
                            ? "scale-100 bottom-4"
                            : currentElement === "Spinach"
                              ? "scale-50 bottom-4"
                              : currentElement === "Barbecue Sauce"
                                ? "scale-75 bottom-2/3 right-px"
                                : "scale-50"
                }`}
                // className="max-w-100 max-h-100 rounded-md absolute left-80 top-1/2 bottom-1/2 object-center scale-50"

                width={props.width || 400}
                height={props.height || 500}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
