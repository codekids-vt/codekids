import React, { useState, useEffect } from "react";
import { Reader } from "./Reader";
import { PythonTutor } from "./PythonTutor";

export interface IWalkThroughCodeProps {
  code: { CodeLines: string }[]; // Each object represents one line of code.
  headerText: string;
  image: string;
}

export function WalkThroughCode({
  props,
  setAllowNext,
}: {
  props: IWalkThroughCodeProps;
  setAllowNext: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { code, headerText, image } = props;
  const totalLines = code.length;
  const [currentLine] = useState(0);
  const [reload] = useState(0);

  // Enable next only when the user reaches the last line.
  useEffect(() => {
    setAllowNext(currentLine >= totalLines - 1);
  }, [currentLine, totalLines, setAllowNext]);

  return (
    <div className="flex flex-col w-full h-full gap-4 items-center">
      {/* Header: image and header text */}
      <div className="flex flex-col items-center">
        {image && (
          <img
            src={image}
            alt="Code walkthrough illustration"
            className="w-20 h-20 xl:w-52 xl:h-52"
          />
        )}
        <Reader text={headerText} />
      </div>

      {/* Code Section */}
      <div className="flex justify-center w-full">
        <div className="max-w-3xl w-full min-h-[300px] overflow-y-auto">
          <PythonTutor
            props={{
              code: code.map((line) => line.CodeLines).join("\n"), // Extract CodeLines from each object.
              instruction: currentLine,
              reload: reload,
            }}
          />
        </div>
      </div>
    </div>
  );
}
