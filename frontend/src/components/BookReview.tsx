import React, { useState } from "react";
import useSound from "use-sound";
import { useAuth } from "../context/AuthContext";
import { handleInteraction } from "../util/interaction";

interface BookReviewProps {}

export function BookReview({
  props,
  setAllowNext,
}: {
  props: BookReviewProps;
  setAllowNext: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const options = [
    {
      text: "Thumbs up",
      image:
        "https://codekids-minio.endeavour.cs.vt.edu/codekids/book_review/thumbs_up.jpg",
    },
    {
      text: "Thumbs down",
      image:
        "https://codekids-minio.endeavour.cs.vt.edu/codekids/book_review/thumbs_down.jpg",
    },
  ];
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [playCorrectSound] = useSound("/sounds/correct.wav", { volume: 0.5 });
  // const [bookReviewFlag, setBookReviewFlag] = useState<boolean| undefined>(undefined); // By default, the book review flag is set to false(thumbs down)
  const { user } = useAuth();
  const startTime = new Date().getTime();
  const url = new URL(window.location.href);
  const pathSegments = url.pathname.split("/").filter((segment) => segment);
  const bookID = parseInt(pathSegments[1], 10);
  const pageID = parseInt(pathSegments[2], 10);

  const handleOptionClick = (choice: string) => {
    setSelectedOption(choice);
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      const timeSpent = Math.round((new Date().getTime() - startTime) / 1000);
      setAllowNext(true);
      playCorrectSound();
      handleInteraction(
        "option_selected",
        true,
        timeSpent,
        user?.id,
        bookID,
        pageID,
        selectedOption === "Thumbs up",
      );
    }
  };

  React.useEffect(() => {
    setAllowNext(true); // Ensures that the next button is initially disabled
  }, [setAllowNext]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Centered text above the buttons */}
      <h2 className="text-xl font-bold text-center">
        Review this book, did you like it?
      </h2>

      <div className="flex flex-wrap justify-center space-x-4">
        {options.map(
          (option: { text: string; image: string }, index: number) => (
            <div key={index} className="flex flex-col items-center">
              <button
                className={`px-4 py-2 text-lg font-medium ${
                  selectedOption === option.text
                    ? "bg-primary-green text-white"
                    : "bg-gray-100 text-gray-800"
                } border border-gray-300 rounded-md shadow-sm hover:outline-none hover:ring-2 hover:ring-primary-green hover:border-primary-green`}
                onClick={() => handleOptionClick(option.text)}
              >
                {option.text}
              </button>
              <img
                src={option.image}
                alt={option.text}
                className="mt-2 w-auto max-h-40 rounded-md"
                width={60} //dummy number
                height={60} // dummy number
              />
            </div>
          ),
        )}
      </div>

      <button
        className="mt-4 px-6 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}
