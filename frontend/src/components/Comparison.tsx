import React, { Dispatch, SetStateAction, useState } from "react";
import useSound from "use-sound";
import { handleInteraction } from "../util/interaction";
import { useAuth } from "../context/AuthContext";

export function Comparison({
  props,
  setAllowNext,
}: {
  props: any;
  setAllowNext: Dispatch<SetStateAction<boolean>>;
}) {
  const { user } = useAuth();
  const [startTime, setTime] = useState<number>(0);
  const [bookID, setbookID] = useState(0);
  const [pageID, setpageID] = useState(0);

  // Example options to classify as True or False
  const initialOptions = [
    { id: 1, label: "Option 1", status: "bank" },
    { id: 2, label: "Option 2", status: "bank" },
    { id: 3, label: "Option 3", status: "bank" },
  ];

  const [options, setOptions] = useState(initialOptions);

  const [playCorrectSound] = useSound("/sounds/correct.wav", { volume: 0.5 });
  const [playIncorrectSound] = useSound("/sounds/incorrect.mp3", {
    volume: 0.5,
  });

  enum AlertType {
    NONE,
    SUCCESS,
    FAILURE,
  }

  const [currentAlert, setCurrentAlert] = useState<{
    type: AlertType;
    message: string;
  }>({ type: AlertType.NONE, message: "" });

  React.useEffect(() => {
    // Initialize bookID, pageID, and startTime from URL if needed
    setTime(new Date().getTime());
    const url = new URL(window.location.href);
    const pathSegments = url.pathname.split("/").filter((segment) => segment);
    setbookID(parseInt(pathSegments[1], 10));
    setpageID(parseInt(pathSegments[2], 10));
  }, []);

  React.useEffect(() => {
    const timeSpent = Math.round((new Date().getTime() - startTime) / 1000);
    if (currentAlert.type === AlertType.SUCCESS) {
      playCorrectSound();
      handleInteraction("Some Answer", true, timeSpent, user?.id, bookID, pageID);
    } else if (currentAlert.type === AlertType.FAILURE) {
      playIncorrectSound();
      handleInteraction("Some Answer", false, timeSpent, user?.id, bookID, pageID);
    }
  }, [currentAlert, playCorrectSound, playIncorrectSound, startTime, user, bookID, pageID]);

  React.useEffect(() => {
    // If success allows navigation to next page, adjust as needed
    setAllowNext(currentAlert.type === AlertType.SUCCESS);
  }, [currentAlert, setAllowNext, AlertType.SUCCESS]);

  function onDragStart(e: React.DragEvent, id: number) {
    e.dataTransfer.setData("id", id.toString());
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function onDrop(e: React.DragEvent, dropStatus: "true" | "false") {
    const id = parseInt(e.dataTransfer.getData("id"), 10);
    const updatedOptions = options.map((option) => {
      if (option.id === id) {
        return { ...option, status: dropStatus };
      }
      return option;
    });
    setOptions(updatedOptions);

    // Trigger success/failure feedback
    if (dropStatus === "true") {
      setCurrentAlert({ type: AlertType.SUCCESS, message: "Correct!" });
    } else {
      setCurrentAlert({ type: AlertType.FAILURE, message: "Incorrect. Try again." });
    }
  }

  // Compute styling based on status:
  // bank: neutral
  // true: green
  // false: red
  function getOptionStyle(status: string) {
    if (status === "bank") return "bg-gray-300";
    if (status === "true") return "bg-green-600 text-white";
    if (status === "false") return "bg-red-600 text-white";
    return "bg-gray-300";
  }

  return (
    <div className="flex flex-col p-4 space-y-4 bg-gray-100 rounded-xl">
      {currentAlert.type !== AlertType.NONE && (
        <div
          className={`${
            currentAlert.type === AlertType.SUCCESS
              ? "bg-green-100 border-green-400 text-green-700"
              : "bg-red-100 border-red-400 text-red-700"
          } border p-2 rounded-md text-center`}
        >
          {currentAlert.message}
          {currentAlert.type === AlertType.FAILURE && (
            <button
              onClick={() => setCurrentAlert({ type: AlertType.NONE, message: "" })}
              className="ml-2 text-red-700 font-bold"
            >
              x
            </button>
          )}
        </div>
      )}

      <h1 className="text-center font-bold">{props?.command || "Drag and Drop Classification"}</h1>

      <div className="flex flex-row space-x-4 justify-center">
        {/* Bank of Options */}
        <div className="flex flex-col space-y-2 p-4 bg-white rounded-2xl border-2 border-gray-300">
          <h2 className="text-center font-semibold">Options</h2>
          {options.filter((o) => o.status === "bank").map((option) => (
            <div
              key={option.id}
              draggable
              onDragStart={(e) => onDragStart(e, option.id)}
              className={`cursor-move text-center p-2 rounded-lg shadow ${getOptionStyle(option.status)}`}
            >
              {option.label}
            </div>
          ))}
        </div>

        {/* True Box */}
        <div
          onDrop={(e) => onDrop(e, "true")}
          onDragOver={(e) => onDragOver(e)}
          className="flex-1 flex flex-col space-y-2 p-4 bg-white rounded-2xl border-2 border-gray-300"
        >
          <h2 className="text-center font-semibold">True</h2>
          {options.filter((o) => o.status === "true").map((option) => (
            <div
              key={option.id}
              className={`p-2 rounded-lg shadow ${getOptionStyle(option.status)}`}
            >
              {option.label}
            </div>
          ))}
        </div>

        {/* False Box */}
        <div
          onDrop={(e) => onDrop(e, "false")}
          onDragOver={(e) => onDragOver(e)}
          className="flex-1 flex flex-col space-y-2 p-4 bg-white rounded-2xl border-2 border-gray-300"
        >
          <h2 className="text-center font-semibold">False</h2>
          {options.filter((o) => o.status === "false").map((option) => (
            <div
              key={option.id}
              className={`p-2 rounded-lg shadow ${getOptionStyle(option.status)}`}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
