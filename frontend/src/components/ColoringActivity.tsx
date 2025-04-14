import React, { useState } from "react";
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

export default function CustomColoringActivity({
  props,
}: CustomColoringActivityProps) {
  const [imageParts] = useState<ImagePart[]>(props.imageParts || []);
  const [selectedOverlay, setSelectedOverlay] = useState<{
    [key: string]: string;
  }>({});
  const [availableColors, setAvailableColors] = useState<string[]>([
    "red",
    "orange",
    "green",
    "maroon",
    "gold",
  ]);
  const [newColor, setNewColor] = useState<string>("");

  const handleDragStart = (e: React.DragEvent, color: string) => {
    e.dataTransfer.setData("color", color);
  };

  const handleDrop = (e: React.DragEvent, partName: string) => {
    const color = e.dataTransfer.getData("color");
    setSelectedOverlay((prev) => ({ ...prev, [partName]: color }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleAddColor = () => {
    if (newColor && !availableColors.includes(newColor.toLowerCase())) {
      setAvailableColors((prev) => [...prev, newColor.toLowerCase()]);
      setNewColor("");
    }
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
          placeholder="Enter a color (e.g., blue, #ff0000)"
          className="px-2 py-1 border rounded-md"
        />
        <button
          onClick={handleAddColor}
          className="px-4 py-1 bg-green-600 text-white rounded-md"
        >
          Add Color
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {availableColors.map((color) => (
          <div
            key={color}
            draggable
            onDragStart={(e) => handleDragStart(e, color)}
            className="w-20 h-10 text-white text-center flex items-center justify-center rounded-lg shadow-lg cursor-pointer"
            style={{ backgroundColor: color }}
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
              <div
                style={{ width: "100%", height: "100%", position: "relative" }}
              >
                <img
                  src={part.src}
                  alt={part.name}
                  style={{ width: "100%", height: "100%" }}
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
                      WebkitMaskImage: `url(${part.src})`,
                      WebkitMaskRepeat: "no-repeat",
                      WebkitMaskSize: "100% 100%",
                      maskImage: `url(${part.src})`,
                      maskRepeat: "no-repeat",
                      maskSize: "100% 100%",
                      pointerEvents: "none",
                    }}
                  />
                )}
              </div>
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
}
