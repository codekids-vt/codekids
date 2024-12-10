import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import { useAuth } from "../context/AuthContext";
import { handleInteraction } from "../util/interaction";

interface IPosition {
  top: string;
  left: string;
}

interface IStyle {
  width?: string;
  height?: string;
  [key: string]: string | undefined;
}

interface IOption {
  text: string;
  image: string;
  style?: IStyle;
  position: IPosition;
}

interface ICategory {
  name: string;
  options: IOption[];
}

interface IInputOutputActivityProps {
  showIOLabels: boolean;
  question: string | undefined;
  backgroundImage: string;
  categories: ICategory[];
  width: number;
  height: number;
}

export function InputOutputActivity({
  props,
  setAllowNext,
}: {
  props: IInputOutputActivityProps | any;
  setAllowNext: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { question, categories = [], showIOLabels, backgroundImage } = props;
  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: string | null;
  }>({});
  const [playCorrectSound] = useSound("/sounds/correct.wav", { volume: 0.5 });
  const { user } = useAuth();
  const startTime = new Date().getTime();
  const url = new URL(window.location.href);
  const pathSegments = url.pathname.split("/").filter((segment) => segment);
  const bookID = parseInt(pathSegments[1], 10);
  const pageID = parseInt(pathSegments[2], 10);

  const handleItemClick = (category: string, choice: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [category]: prev[category] === choice ? null : choice,
    }));
  };

  useEffect(() => {
    if (Object.values(selectedItems).some((item) => item !== null)) {
      const timeSpent = Math.round((new Date().getTime() - startTime) / 1000);
      setAllowNext(true);
      playCorrectSound();
      handleInteraction(
        "completed",
        true,
        timeSpent,
        user?.id,
        bookID,
        pageID,
        undefined,
      );
    }
  }, [
    selectedItems,
    setAllowNext,
    playCorrectSound,
    startTime,
    user,
    bookID,
    pageID,
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

      {/* Category options */}
      {categories.map((category: ICategory, categoryIndex: number) => (
        <div
          key={categoryIndex}
          className="flex flex-wrap justify-center space-x-4 mt-4"
        >
          <p className="w-full text-center font-medium mb-2">{category.name}</p>
          {category.options.length > 0 ? (
            category.options.map((option: IOption, optionIndex: number) => (
              <button
                key={optionIndex}
                className={`px-4 py-2 text-lg font-medium ${
                  selectedItems[category.name] === option.text
                    ? "bg-primary-green text-white"
                    : "bg-gray-100 text-gray-800"
                } border border-gray-300 rounded-md shadow-sm hover:outline-none hover:ring-2 hover:ring-primary-green hover:border-primary-green`}
                onClick={() => handleItemClick(category.name, option.text)}
              >
                {option.text}
              </button>
            ))
          ) : (
            <p>No options available for {category.name}</p>
          )}
        </div>
      ))}

      <div className="flex justify-center relative">
        {/* Background image */}
        <img
          src={backgroundImage}
          alt="Background"
          className="h-96 w-96 rounded-md shadow-md justify-center"
        />
        {/* Selected item overlays */}
        {categories.map((category: ICategory, index: number) => {
          const selectedItem = category.options.find(
            (option: IOption) => option.text === selectedItems[category.name],
          );
          if (selectedItem) {
            return (
              <img
                key={index}
                src={selectedItem.image}
                alt={`Selected ${category.name}`}
                className="absolute object-contain"
                style={{
                  top: selectedItem.position.top,
                  left: selectedItem.position.left,
                  width: selectedItem.style?.width,
                  height: selectedItem.style?.height,
                }}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
