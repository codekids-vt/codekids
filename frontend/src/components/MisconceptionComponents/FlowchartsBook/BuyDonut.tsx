import React, { useState } from "react";
import { CodeStep } from "../../CodeStep";
import { MultipleChoiceQuestion, Styles } from "../../Question";
import { FlowchartQuestions } from "../../../util/QuestionBank";

export function BuyDonut({
  setAllowNext,
}: {
  setAllowNext: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const q1 = FlowchartQuestions["BuyDonutQ1"];

  const [currentLine, setCurrentLine] = useState(0);
  const [currentImage, setCurrentImage] = useState("");
  const [showQuestion, setShowQuestion] = useState(false);
  const [enableNext, setEnableNext] = useState(true);

  const [q1Correct, setQ1Correct] = useState(false);

  const code =
    'your_money = 2\ndonut_price = 2\nif donut_price <= your_money:\n\tprint("Yes! You can buy a donut!")\nelse:\n\tprint("Sorry, you don\'t have enough money to buy a yummy donut.")\n \n# End of program';

  React.useEffect(() => {
    setAllowNext(q1Correct && currentLine === 7);
    if (currentLine === 2) {
      setEnableNext(q1Correct);
    }
  }, [q1Correct, currentLine, setAllowNext]);

  const getLine = (lineNumber: number) => {
    setCurrentLine(lineNumber);
    if (lineNumber === 0) {
      setCurrentImage("");
      setShowQuestion(false);
    } else if (lineNumber === 1) {
      setCurrentImage("/FlowchartsBook/BuyDonut/example1_1.svg");
      setShowQuestion(false);
      setEnableNext(true);
    } else if (lineNumber === 2 || lineNumber === 3) {
      setCurrentImage("/FlowchartsBook/BuyDonut/example1_2.svg");
      setShowQuestion(true);
      setEnableNext(q1Correct);
    } else if (lineNumber === 7) {
      setCurrentImage("/FlowchartsBook/example_1.svg");
      setShowQuestion(false);
    }
  };

  return (
    <div className="flex flex-col-2 items-center text-center w-full h-full">
      <div className="flex flex-col w-1/2 justify-center">
        <CodeStep
          props={{
            code: code,
            getLine: getLine,
            skipLines: [4, 5, 6],
            enableNext: enableNext,
          }}
        />
      </div>
      <div className="w-1/2">
        {currentImage !== "" && (
          <img
            className="object-contain max-w-full max-h-full h-fit"
            height={1000}
            width={1000}
            src={currentImage}
            alt="Partial flowchart"
          />
        )}
        {showQuestion && (
          <React.Fragment>
            <MultipleChoiceQuestion
              question={q1.question}
              answers={q1.answers}
              style={Styles.VERTICAL}
              setCorrect={setQ1Correct}
            />
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
