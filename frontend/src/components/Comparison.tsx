import React, { Dispatch, SetStateAction, useState } from "react";
import useSound from "use-sound";
import { handleInteraction } from "../util/interaction";
import { useAuth } from "../context/AuthContext";

type Association = string | "bank";

type Option = {
  id: number;
  label: string;
  correctAssociation: string;
  status: Association;
};

export function Comparison({
  props,
  setAllowNext,
}: {
  props: {
    command?: string;
    categoryA?: string; // First category (e.g. "Front-End")
    categoryB?: string; // Second category (e.g. "Back-End")
    options?: {
      id: number;
      label: string;
      correctAssociation: string;
    }[];
  };
  setAllowNext: Dispatch<SetStateAction<boolean>>;
}) {
  const { user } = useAuth();
  const [startTime, setTime] = useState<number>(0);
  const [bookID, setbookID] = useState(0);
  const [pageID, setpageID] = useState(0);

  const categoryA = props.categoryA || "Front-End";
  const categoryB = props.categoryB || "Back-End";

  // Fallback if no props.options are provided
  const initialOptions: Option[] =
    props.options && props.options.length > 0
      ? props.options.map((o) => ({ ...o, status: "bank" as const }))
      : [
          {
            id: 1,
            label: "React",
            correctAssociation: categoryA,
            status: "bank",
          },
          {
            id: 2,
            label: "Node.js",
            correctAssociation: categoryB,
            status: "bank",
          },
          {
            id: 3,
            label: "CSS",
            correctAssociation: categoryA,
            status: "bank",
          },
        ];

  const [options, setOptions] = useState<Option[]>(initialOptions);

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
    if (pathSegments[1]) setbookID(parseInt(pathSegments[1], 10));
    if (pathSegments[2]) setpageID(parseInt(pathSegments[2], 10));
  }, []);

  React.useEffect(() => {
    const timeSpent = Math.round((new Date().getTime() - startTime) / 1000);
    if (currentAlert.type === AlertType.SUCCESS) {
      playCorrectSound();
      handleInteraction(
        "Some Answer",
        true,
        timeSpent,
        user?.id,
        bookID,
        pageID,
      );
    } else if (currentAlert.type === AlertType.FAILURE) {
      playIncorrectSound();
      handleInteraction(
        "Some Answer",
        false,
        timeSpent,
        user?.id,
        bookID,
        pageID,
      );
    }
  }, [
    currentAlert,
    playCorrectSound,
    playIncorrectSound,
    startTime,
    user,
    bookID,
    pageID,
  ]);

  React.useEffect(() => {
    // You can tailor the condition that allows next page.
    // For now, sets allowNext to true if the last action was correct.
    setAllowNext(currentAlert.type === AlertType.SUCCESS);
  }, [currentAlert, setAllowNext]);

  function onDragStart(e: React.DragEvent, id: number) {
    e.dataTransfer.setData("id", id.toString());
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function onDrop(e: React.DragEvent, dropStatus: Association) {
    const id = parseInt(e.dataTransfer.getData("id"), 10);
    let isCorrect = false;
    const updatedOptions = options.map((option) => {
      if (option.id === id) {
        // Check correctness only if dropping into categoryA or categoryB
        if (dropStatus !== "bank") {
          const correct = option.correctAssociation === dropStatus;
          if (correct) {
            isCorrect = true;
          }
        }
        return { ...option, status: dropStatus };
      }
      return option;
    });
    setOptions(updatedOptions);

    // Trigger success/failure feedback only if dropping into categoryA or categoryB
    if (dropStatus === categoryA || dropStatus === categoryB) {
      if (isCorrect) {
        setCurrentAlert({ type: AlertType.SUCCESS, message: "Correct!" });
      } else {
        const droppedOption = options.find((option) => option.id === id);
        setCurrentAlert({
          type: AlertType.FAILURE,
          message: `Incorrect. ${droppedOption?.label} belongs to ${droppedOption?.correctAssociation}. Try again.`,
        });
      }
    } else {
      // Dropping back to bank doesn't show alerts
      setCurrentAlert({ type: AlertType.NONE, message: "" });
    }
  }

  // Compute styling based on correctness:
  // If status matches the correctAssociation, green; otherwise red.
  // Bank is neutral.
  function getOptionStyle(option: Option) {
    if (option.status === "bank") return "bg-gray-300";
    const isCorrect = option.status === option.correctAssociation;
    return isCorrect ? "bg-green-600 text-white" : "bg-red-600 text-white";
  }

  function renderOptionsForStatus(status: Association) {
    return options
      .filter((o) => o.status === status)
      .map((option) => (
        <div
          key={option.id}
          draggable={true}
          onDragStart={(e) => onDragStart(e, option.id)}
          className={`cursor-move text-center p-2 rounded-lg shadow ${getOptionStyle(option)}`}
        >
          {option.label}
        </div>
      ));
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
              onClick={() =>
                setCurrentAlert({ type: AlertType.NONE, message: "" })
              }
              className="ml-2 text-red-700 font-bold"
            >
              x
            </button>
          )}
        </div>
      )}

      <h1 className="text-center font-bold">
        {props?.command || "Drag and Drop Classification"}
      </h1>

      <div className="flex flex-row space-x-4 justify-center">
        {/* Bank of Options (Now droppable) */}
        <div
          className="flex flex-col space-y-2 p-4 bg-white rounded-2xl border-2 border-gray-300 w-96 h-96"
          onDrop={(e) => onDrop(e, "bank")}
          onDragOver={(e) => onDragOver(e)}
        >
          <h2 className="text-center font-semibold">Options</h2>
          {renderOptionsForStatus("bank")}
        </div>

        {/* Category A Box */}
        <div
          onDrop={(e) => onDrop(e, categoryA)}
          onDragOver={(e) => onDragOver(e)}
          className="flex-1 flex flex-col space-y-2 p-4 bg-white rounded-2xl border-2 border-gray-300 w-96 h-96"
        >
          <h2 className="text-center font-semibold">{categoryA}</h2>
          {renderOptionsForStatus(categoryA)}
        </div>

        {/* Category B Box */}
        <div
          onDrop={(e) => onDrop(e, categoryB)}
          onDragOver={(e) => onDragOver(e)}
          className="flex-1 flex flex-col space-y-2 p-4 bg-white rounded-2xl border-2 border-gray-300 w-96 h-96"
        >
          <h2 className="text-center font-semibold">{categoryB}</h2>
          {renderOptionsForStatus(categoryB)}
        </div>
      </div>
    </div>
  );
}
