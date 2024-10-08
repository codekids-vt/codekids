/*
    This component creates a code snippet that can be clicked though step by step.
*/

import React, { useState } from "react";
import { CodeBlock } from "react-code-blocks";

/*
    Code is delimited by \n 
*/
export interface ICodeStepProps {
  code: string;
  skipLines: number[];
  enableNext: boolean;
  getLine: (lineNumber: number) => void;
}

export interface ILoop {
  exists: boolean;
  lines?: number[];
  times?: number;
  getIteration?: (iterationNumber: number) => void;
}

export function CodeStep({
  props,
  loop,
  useCodeBlock,
}: {
  props: ICodeStepProps;
  loop: ILoop;
  useCodeBlock?: boolean;
}) {
  const [currentLine, setCurrentLine] = useState(0);
  const [loopIteration, setLoopIteration] = useState(0);

  const code: string[] = props.code.split("\n");

  function checkCurrentLine(thisLine: number, currentLine: number) {
    if (thisLine === currentLine) return "yellow";
    return "none";
  }

  function nextButton() {
    if (!loop.exists) {
      if (currentLine === code.length - 1) return;
      var nextLine = currentLine + 1;
      while (props.skipLines.includes(nextLine) && nextLine !== code.length - 1)
        nextLine++;
      setCurrentLine(nextLine);
      props.getLine(nextLine);
    } else {
      nextLoop();
    }
  }

  function nextLoop() {
    if (
      loop.lines !== undefined &&
      loop.times !== undefined &&
      loop.getIteration !== undefined
    ) {
      var nextLine = currentLine + 1;
      if (
        !loop.lines.includes(nextLine) &&
        currentLine !== loop.lines[loop.lines.length - 1]
      ) {
        // nextLine is not within loop
        if (currentLine === code.length - 1) return;
        while (
          props.skipLines.includes(nextLine) &&
          nextLine !== code.length - 1
        )
          nextLine++;
      } else {
        // nextLine is within loop
        if (currentLine === loop.lines[0] && loopIteration === loop.times) {
          // Loop executed loop.times
          nextLine = loop.lines[loop.lines.length - 1] + 1;
          while (
            props.skipLines.includes(nextLine) &&
            nextLine !== code.length - 1
          )
            nextLine++;
        } else if (nextLine === loop.lines[1]) {
          // Next line is the first line within the loop
          setLoopIteration(loopIteration + 1);
          loop.getIteration(loopIteration + 1);
        } else if (currentLine === loop.lines[loop.lines.length - 1]) {
          // Current line is end of loop
          nextLine = loop.lines[0];
        }
      }
      setCurrentLine(nextLine);
      props.getLine(nextLine);
    }
  }

  function backButton() {
    if (!loop.exists) {
      if (currentLine === 0) return;
      var nextLine = currentLine - 1;
      while (props.skipLines.includes(nextLine) && nextLine !== 0) nextLine--;
      setCurrentLine(nextLine);
      props.getLine(nextLine);
    } else {
      backLoop();
    }
  }

  function backLoop() {
    if (
      loop.lines !== undefined &&
      loop.times !== undefined &&
      loop.getIteration !== undefined
    ) {
      var nextLine = currentLine - 1;
      if (!loop.lines.includes(nextLine) && currentLine !== loop.lines[0]) {
        // nextLine is not within loop
        if (currentLine === 0) return;
        while (props.skipLines.includes(nextLine) && nextLine !== 0) nextLine--;

        if (nextLine === loop.lines[loop.lines.length - 1]) {
          nextLine = loop.lines[0];
        }
      } else {
        if (currentLine === loop.lines[0] && loopIteration > 0) {
          nextLine = loop.lines[loop.lines.length - 1];
        } else if (currentLine === loop.lines[0]) {
          if (currentLine === 0) return;
          while (props.skipLines.includes(nextLine) && nextLine !== 0)
            nextLine--;
        } else if (nextLine === loop.lines[0]) {
          setLoopIteration(loopIteration - 1);
          loop.getIteration(loopIteration - 1);
        }
      }
      setCurrentLine(nextLine);
      props.getLine(nextLine);
    }
  }

  return (
    <React.Fragment>
      <div className=" flex flex-col ml-auto mr-auto px-10 py-5 w-fit bg-zinc-200 text-start">
        {useCodeBlock ? (
          <CodeBlock
            text={props.code}
            language="python"
            highlight={
              currentLine === 0
                ? ""
                : `${code[0].includes("#") ? "1," : ""}${(currentLine + 1).toString()}`
            }
          />
        ) : (
          code.map((line, index) => (
            <div
              className="px-5 whitespace-pre-wrap text-left"
              key={line + index}
              style={{ background: checkCurrentLine(index, currentLine) }}
            >
              {line}
            </div>
          ))
        )}
      </div>
      <div className="inline-flex mt-5 rounded-md gap-10 justify-center">
        <button
          className="bg-gray-300 text-xl border-black border-2 rounded-3xl px-5 py-2 m-1 whitespace-pre-wrap"
          type="button"
          onClick={() => backButton()}
        >
          Back
        </button>
        <button
          className={`${!props.enableNext ? "opacity-50" : ""} bg-gray-300 text-xl border-black border-2 rounded-3xl px-5 m-1 whitespace-pre-wrap`}
          disabled={!props.enableNext}
          type="button"
          onClick={() => nextButton()}
        >
          Next
        </button>
      </div>
    </React.Fragment>
  );
}
