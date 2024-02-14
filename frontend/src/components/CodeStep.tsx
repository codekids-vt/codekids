/*
    This component creates a code snippet that can be clicked though step by step.
*/

import React, { useState } from "react";

/*
    Code is delimited by \n 
*/
export interface ICodeStepProps {
  code: string;
  skipLines: number[];
  enableNext: boolean;
  getLine: () => {};
}

export function CodeStep({ props }: { props: any | ICodeStepProps }) {
  const [currentLine, setCurrentLine] = useState(0);

  const code: string[] = props.code.split("\n");

  function checkCurrentLine(thisLine: number, currentLine: number) {
    if (thisLine === currentLine) return "yellow";
    return "none";
  }

  function getButtonStyle() {
    if (props.enableNext) return button_style;
    return disabled_button_style;
  }

  function nextButton() {
    if (currentLine === code.length - 1) return;
    var nextLine = currentLine + 1;
    while (props.skipLines.includes(nextLine) && nextLine !== code.length - 1)
      nextLine++;
    setCurrentLine(nextLine);
    props.getLine(nextLine);
  }

  function backButton() {
    if (currentLine === 0) return;
    var nextLine = currentLine - 1;
    while (props.skipLines.includes(nextLine) && nextLine !== 0) nextLine--;
    setCurrentLine(nextLine);
    props.getLine(nextLine);
  }

  return (
    <React.Fragment>
      <div className=" flex flex-col ml-auto mr-auto px-10 py-5 w-fit bg-zinc-200 ">
        {code.map((line, index) => (
          <div
            className="px-5 whitespace-pre-wrap text-left"
            key={index}
            style={{ background: checkCurrentLine(index, currentLine) }}
          >
            {line}
          </div>
        ))}
      </div>
      <div className="inline-flex mt-5 rounded-md gap-10 justify-center">
        <button style={button_style} type="button" onClick={() => backButton()}>
          Back
        </button>
        <button
          style={getButtonStyle()}
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

const button_style = {
  backgroundColor: "#D1D5DB",
  color: "black",
  fontSize: "20px",
  border: "1px solid grey",
  borderRadius: "30px",
  padding: "5px 20px",
  margin: ".5%",
  cursor: "pointer",
  whiteSpace: "pre-wrap" as "pre-wrap",
};

const disabled_button_style = {
  backgroundColor: "#D1D5DB",
  color: "black",
  fontSize: "20px",
  border: "1px solid grey",
  borderRadius: "30px",
  padding: "5px 20px",
  margin: ".5%",
  cursor: "pointer",
  whiteSpace: "pre-wrap" as "pre-wrap",
  opacity: "50%",
};
