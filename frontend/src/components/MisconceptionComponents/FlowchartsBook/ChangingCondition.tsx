import React, { useState } from "react";
import { Reader } from "../../Reader";
import { CodeStep } from "../../CodeStep";
import { MultipleChoiceQuestion, Styles } from "../../Question";
import { FlowchartQuestions } from "../../../util/QuestionBank";

export interface IChangingConditionProps {
  pageNumber: number;
}

export function ChangingCondition({
  props,
  setAllowNext,
}: {
  props: any | IChangingConditionProps;
  setAllowNext: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const q1 = FlowchartQuestions["ChangingConditionQ1"];

  const [currentImage, setCurrentImage] = useState("");
  const [imageDim, setImageDim] = useState([600, 600]);

  const [q1Correct, setQ1Correct] = useState(false);

  const [p3Text, setP3Text] = useState("");
  const [currentLineNumber, setLineNumber] = useState(0);

  const code =
    "your_money = 16\npepperoni_price = 11\ncake_price = 3\ndonut_price = 2\nif pepperoni_price <= your_money:\n\t" +
    'print("Yes, you have enough money to buy a pepperoni pizza!")\n\trest_money = your_money - pepperoni_price\n\t' +
    'if cake_price + donut_price <= rest_money:\n\t\tprint("Yes, you have enough rest money to buy a strawberry cake and a donut!")\n\t' +
    'else:\n\t\tprint("Sorry, there\'s a not enough money left for a strawberry shortcake and a donut.")\n' +
    'else:\n\tprint("Sorry, you don\'t have enough money to buy a pepperoni pizza!")\n \n# End of program';

  React.useEffect(() => {
    if (props.pageNumber === 1) {
      setAllowNext(q1Correct);
    } else if (props.pageNumber === 2) {
      setAllowNext(currentLineNumber === 14);
    }
  }, [q1Correct, currentLineNumber, props.pageNumber, setAllowNext]);

  const getLine = (lineNumber: number) => {
    setLineNumber(lineNumber);
    if (lineNumber < 3) {
      setCurrentImage("");
    } else if (lineNumber === 3) {
      setCurrentImage("/FlowchartsBook/ChangingCondition/example4_1.svg");
      setP3Text("At the point, all of the variables are created.");
    } else if (lineNumber === 4 || lineNumber === 5) {
      setCurrentImage("/FlowchartsBook/ChangingCondition/example4_2.svg");
      setP3Text(
        "pepperoni_price is less than your_money, so the True arrow will be followed.",
      );
      setImageDim([1000, 1000]);
    } else if (lineNumber === 6) {
      setCurrentImage("/FlowchartsBook/ChangingCondition/example4_2.svg");
      setP3Text(
        "The variable rest_money is created and will have the value 5.",
      );
      setImageDim([1000, 1000]);
    } else if (lineNumber === 7 || lineNumber === 8) {
      setCurrentImage("/FlowchartsBook/example_4.svg");
      setP3Text(
        "rest_money is equal to cake_price + donut_price. So, the True arrow is followed.",
      );
      setImageDim([1200, 1200]);
    } else if (lineNumber === 14) {
      setP3Text(
        "The rest of code is skipped since they are 'else' and the program ends.",
      );
    }
  };

  if (props.pageNumber === 1) {
    return getPage1();
  } else {
    return getPage2();
  }

  function getPage1() {
    return (
      <div className="flex flex-col items-center text-center w-full">
        <img
          height={1300}
          width={1300}
          src={"/FlowchartsBook/example_4.svg"}
          alt="flow"
        />
        <div className="flex flex-col gap-5">
          <MultipleChoiceQuestion
            question={q1.question}
            answers={q1.answers}
            style={Styles.VERTICAL}
            setCorrect={setQ1Correct}
          />
        </div>
      </div>
    );
  }

  function getPage2() {
    return (
      <div className="flex flex-col gap-5 w-full h-screen font-semibold text-lg text-center">
        <div className="flex flex-col gap-5 mb-10">
          <Reader text="Let's run through the code and see how it relates to the flowchart!" />
          <Reader text="The flowchart will be constructed as you go through the code." />
        </div>
        <div className="flex flex-col-2 items-start text-center h-100">
          <div className="w-1/2">
            <CodeStep
              props={{
                code: code,
                skipLines: [9, 10, 11, 12, 13],
                enableNext: true,
                getLine: getLine,
              }}
              loop={{exists: false}}
            />
          </div>
          <div className="flex flex-col text-center w-1/2">
            {p3Text !== "" && <Reader text={p3Text} />}
            {currentImage !== "" && (
              <img
                height={imageDim[0]}
                width={imageDim[1]}
                src={currentImage}
                alt="flow"
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
