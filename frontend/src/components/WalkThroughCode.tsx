import React, { useState, useEffect } from "react";
import { Reader } from "./Reader";
import { PythonTutor } from "./PythonTutor";

export interface IWalkThroughCodeProps {
  code: string; // Now just a single string, not an array of CodeLines!
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
  const [currentLine] = useState(0);
  const [reload] = useState(0);

  // Enable next only when the user reaches the last line.
  useEffect(() => {
    setAllowNext(true); // Always allow next since we're not stepping line-by-line anymore
  }, [setAllowNext]);

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
              code: code, // Directly pass the string code here
              instruction: currentLine,
              reload: reload,
            }}
          />
        </div>
      </div>
    </div>
  );
}
