import React, { useState } from "react";
import useSound from "use-sound";

export interface IDragAndDropActivityProps {
  dogImage: string;
  treatImage: string;
  toyImage: string;
  completionSound: string;
}

export function DragAndDropActivity({
  props,
  setAllowNext,
}: {
  props: IDragAndDropActivityProps;
  setAllowNext: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { dogImage, treatImage, toyImage, completionSound } = props;
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isItemDropped, setIsItemDropped] = useState<boolean>(false);
  const [playCompletionSound] = useSound(completionSound, { volume: 0.5 });

  // Handle drag event start
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    itemType: string,
  ) => {
    e.dataTransfer.setData("itemType", itemType);
  };

  // Handle drop event
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const itemType = e.dataTransfer.getData("itemType");
    if (itemType === "treat" || itemType === "toy") {
      setIsCompleted(true);
      setIsItemDropped(true);
      playCompletionSound();
      setAllowNext(true);
    }
    e.preventDefault();
  };

  // Allow drop event
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="drag-and-drop-activity flex items-center justify-between"
      style={{ minHeight: "90vh", width: "100%", padding: "0 5%" }}
    >
      {/* Left Side: Treat and Toy vertically aligned */}
      <div
        className="left-items flex flex-col space-y-8"
        style={{ alignItems: "flex-start" }}
      >
        {/* Treat */}
        <div
          className="treat cursor-pointer"
          draggable
          onDragStart={(e) => onDragStart(e, "treat")}
          style={{ width: 100, height: 100 }}
        >
          <img
            src={treatImage}
            alt="Treat"
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Toy */}
        <div
          className="toy cursor-pointer"
          draggable
          onDragStart={(e) => onDragStart(e, "toy")}
          style={{ width: 100, height: 100 }}
        >
          <img
            src={toyImage}
            alt="Toy"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>

      {/* Right Side: Dog image vertically aligned with treats */}
      <div
        className="drop-area"
        style={{
          width: 150,
          height: 150,
          position: "relative",
          border: "2px dashed gray",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <img
          src={dogImage}
          alt="Dog"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Show success message */}
      {isCompleted && (
        <p className="text-green-500 mt-4">
          Well done! You gave the dog a gift!
        </p>
      )}
    </div>
  );
}
