import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";

interface ImagePart {
  name: string;
  src: string;
  style: React.CSSProperties;
  overlayColor?: string;
}

interface CustomColoringActivityProps {
  props: {
    imageParts: ImagePart[];
  };
}

const availableColors = ["red", "orange", "green", "maroon", "gold"];

export default function CustomColoringActivity({
  props,
}: CustomColoringActivityProps) {
  const [imageParts, setImageParts] = useState<ImagePart[]>(
    props.imageParts || [],
  );
  const [selectedOverlay, setSelectedOverlay] = useState<{
    [key: string]: string;
  }>({});
  const [draggedColor, setDraggedColor] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, color: string) => {
    e.dataTransfer.setData("color", color);
    setDraggedColor(color);
  };

  const handleDrop = (e: React.DragEvent, partName: string) => {
    const color = e.dataTransfer.getData("color");
    setSelectedOverlay((prev) => ({ ...prev, [partName]: color }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <div className="flex flex-wrap justify-center gap-2">
        {availableColors.map((color) => (
          <div
            key={color}
            draggable
            onDragStart={(e) => handleDragStart(e, color)}
            className={`w-20 h-10 bg-${color}-600 text-white text-center flex items-center justify-center rounded-lg shadow-lg cursor-pointer`}
          >
            {color}
          </div>
        ))}
      </div>

      <div className="relative w-full h-[600px] border mt-6 bg-gray-100">
        {imageParts.map((part) => (
          <Draggable key={part.name}>
            <div
              onDrop={(e) => handleDrop(e, part.name)}
              onDragOver={handleDragOver}
              style={{ ...part.style, position: "absolute" }}
            >
              <img
                src={part.src}
                alt={part.name}
                style={{ width: "100%", height: "100%", borderRadius: "12px" }}
              />
              {selectedOverlay[part.name] && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: selectedOverlay[part.name],
                    opacity: 0.5,
                    borderRadius: "12px",
                    zIndex: 2,
                  }}
                />
              )}
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
}
