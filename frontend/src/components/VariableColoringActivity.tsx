// VariableColoringActivity.tsx
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import useSound from "use-sound";
import { handleInteraction } from "../util/interaction";
import { useAuth } from "../context/AuthContext";

export interface PartConfig {
  name: string;
  image: string;
  positionClass: string; // Tailwind class to place the image
}

export interface ActivityProps {
  command: string;
  draggable: boolean;
  type: boolean;
  typeVariable: boolean;
  baseImage: string;
  parts: PartConfig[];
  availableColors: string[];
  colorsTailwind: { [key: string]: string };
  helpImage?: string;
}

interface VariableColoringActivityProps {
  props: ActivityProps;
  setAllowNext: Dispatch<SetStateAction<boolean>>;
}

export function VariableColoringActivity({
  props,
  setAllowNext,
}: VariableColoringActivityProps) {
  const { user } = useAuth();
  const [partNames, setPartNames] = useState<string[]>(
    Array(props.parts.length).fill(""),
  );
  const [colors, setColors] = useState<{ [key: string]: string }>({});
  const [answer, setAnswer] = useState("");
  const [startTime, setTime] = useState(0);
  const [bookID, setbookID] = useState(0);
  const [pageID, setpageID] = useState(0);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
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
  }>({
    type: AlertType.NONE,
    message: "",
  });

  useEffect(() => {
    setTime(new Date().getTime());
    const url = new URL(window.location.href);
    const pathSegments = url.pathname.split("/").filter((segment) => segment);
    setbookID(parseInt(pathSegments[1], 10));
    setpageID(parseInt(pathSegments[2], 10));
  }, []);

  useEffect(() => {
    const timeSpent = Math.round((new Date().getTime() - startTime) / 1000);
    if (currentAlert.type === AlertType.SUCCESS) {
      playCorrectSound();
      handleInteraction(
        answer,
        true,
        timeSpent,
        user?.id,
        bookID,
        pageID,
        undefined,
      );
    } else if (currentAlert.type === AlertType.FAILURE) {
      playIncorrectSound();
      handleInteraction(
        answer,
        false,
        timeSpent,
        user?.id,
        bookID,
        pageID,
        undefined,
      );
    }
  }, [currentAlert]);

  useEffect(() => {
    setAllowNext(currentAlert.type === AlertType.SUCCESS);
  }, [currentAlert]);

  const handleColorChange = (part: string, value: string) => {
    const val = value.toLowerCase().replaceAll('"', "");
    if (props.availableColors.includes(val)) {
      setAnswer(val);
      setColors((prev) => ({ ...prev, [part]: val }));
      setCurrentAlert({ type: AlertType.SUCCESS, message: "Correct!" });
    } else {
      setCurrentAlert({ type: AlertType.FAILURE, message: "Invalid color." });
    }
  };

  const handleOnDrop = (e: React.DragEvent, part: string) => {
    const color = e.dataTransfer.getData("Color") as string;
    setColors((prev) => ({ ...prev, [part]: color }));
    setAnswer(color);
    setCurrentAlert({ type: AlertType.SUCCESS, message: "Correct!" });
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleOnDrag = (e: React.DragEvent, color: string) =>
    e.dataTransfer.setData("Color", color);

  return (
    <div className="flex flex-row text-xs xl:text-base">
      {/* IMAGE */}
      <div className="flex flex-col flex-grow justify-center items-center relative">
        <img
          src={props.baseImage}
          alt="Base Image"
          className="center-left w-[200px] xl:w-[500px]"
          width={500}
          height={500}
        />
        {props.parts.map((part) => (
          <img
            key={part.name}
            src={part.image}
            alt={part.name}
            className={`absolute ${part.positionClass} img-${colors[part.name]}`}
            width={500}
            height={500}
          />
        ))}
      </div>

      {/* UI Panel */}
      <div className="flex flex-col p-1 bg-gray-200 rounded-2xl">
        {currentAlert.type !== AlertType.NONE && (
          <div
            className={`bg-${currentAlert.type === AlertType.SUCCESS ? "green" : "red"}-100 border text-${currentAlert.type === AlertType.SUCCESS ? "green" : "red"}-700 py-1 rounded-full text-center`}
          >
            <span>{currentAlert.message}</span>
          </div>
        )}
        <h1 className="font-bold text-center xl:p-4">{props.command}</h1>
        <div className="flex flex-row px-2">
          <div className="flex flex-col px-1 space-y-2">
            {props.parts.map((part, index) => (
              <div
                key={part.name}
                onDrop={(e) => handleOnDrop(e, part.name)}
                onDragOver={handleDragOver}
                className="border-2 flex flex-row rounded-sm outline-dotted text-center"
              >
                <label>
                  {props.typeVariable ? (
                    <input
                      type="text"
                      className="rounded-sm w-24"
                      defaultValue={part.name}
                      disabled
                    />
                  ) : (
                    part.name
                  )}
                  {" = "}
                  <input
                    type="text"
                    className="rounded-sm w-24"
                    placeholder={
                      props.type ? "Type a color here" : "Drag a color here"
                    }
                    onChange={(e) =>
                      handleColorChange(part.name, e.target.value)
                    }
                    value={colors[part.name] ? `"${colors[part.name]}"` : ""}
                  />
                </label>
              </div>
            ))}
          </div>

          <div className="flex flex-col px-2">
            <h1 className="font-bold text-center">Options:</h1>
            <div className="grid grid-cols-2 gap-2">
              {props.availableColors.map((color, index) => (
                <div
                  key={index}
                  draggable={props.draggable}
                  className={`flex ${props.colorsTailwind[color]} px-1 place-content-center rounded-2xl shadow-2xl`}
                  onDragStart={(e) => handleOnDrag(e, color)}
                >
                  <q className="text-white">{color}</q>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
