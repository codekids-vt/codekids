import React, { useState } from "react";
import { Reader } from "../../Reader";
import { CodeStep } from "../../CodeStep";
import { MultipleChoiceQuestion, Styles } from "../../Question";
import { FlowchartQuestions } from "../../../util/QuestionBank";

export interface IMultipleConditionsProps {
  pageNumber: number;
}

export function MultipleConditions({
  props,
  setAllowNext,
}: {
  props: any | IMultipleConditionsProps;
  setAllowNext: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const q1 = FlowchartQuestions["MultipleConditionsQ1"];

  const [currentImage, setCurrentImage] = useState("");
  const [imageDim, setImageDim] = useState([600, 600]);

  const [q1Correct, setQ1Correct] = useState(false);

  const [p2Text, setP2Text] = useState("");
  const [currentLineNumber, setLineNumber] = useState(0);

  const code =
    'my_money = 7\npepperoni_price = 11\nsalad_price = 8\nburger_price = 5\nif my_money >= pepperoni_price:\n\tprint("Great! You can buy a pepperoni pizza!")\n' +
    'elif my_money >= salad_price:\n\tprint("Great! You have enough money to buy a healthy green salad!")\n' +
    'elif my_money >= burger_price:\n\tprint("Great! You can buy a delicious bacon & beef burger!")\n' +
    "else:\n\tprint(\"Sadly, you don't have enough money to buy, whether it's a pepperoni pizza or a green salad or a burger.\")\n \n# End of program";

  React.useEffect(() => {
    if (props.pageNumber === 2) {
      setAllowNext(q1Correct);
    } else if (props.pageNumber === 3) {
      setAllowNext(currentLineNumber === 13);
    }
  }, [q1Correct, currentLineNumber, props.pageNumber, setAllowNext]);

  const getLine = (lineNumber: number) => {
    setLineNumber(lineNumber);
    if (lineNumber < 3) {
      setCurrentImage("");
      setP2Text("");
    } else if (lineNumber === 3) {
      setCurrentImage("/FlowchartsBook/MultipleConditions/example3_1.svg");
      setImageDim([750, 750]);
      setP2Text("At the point, all of the variables are created.");
    } else if (lineNumber === 4) {
      setCurrentImage("/FlowchartsBook/MultipleConditions/example3_2.svg");
      setP2Text(
        "my_money is less than pepperoni_price, so we'll follow the False arrow.",
      );
    } else if (lineNumber === 6) {
      setCurrentImage("/FlowchartsBook/MultipleConditions/example3_3.svg");
      setP2Text(
        "my_money is less than salad_price, so we'll follow the False arrow.",
      );
    } else if (lineNumber === 8 || lineNumber === 9) {
      setCurrentImage("/FlowchartsBook/MultipleConditions/example3_4.svg");
      setP2Text(
        "my_money is greater than burger_price, so we'll follow the True arrow!",
      );
    } else if (lineNumber === 13) {
      setP2Text("We then follow the arrow to the end of the program!");
    }
  };

  if (props.pageNumber === 1) {
    return getPage1();
  } else if (props.pageNumber === 2) {
    return getPage2();
  } else {
    return getPage3();
  }

  function getPage1() {
    return (
      <div className="flex flex-col items-center text-center w-full">
        <img
          width={400}
          height={400}
          src={"/FlowchartsBook/MultipleConditions/food.png"}
          alt="food."
        />
        <img
          width={500}
          height={500}
          src={"/FlowchartsBook/example_3.svg"}
          alt="food."
        />
      </div>
    );
  }

  function getPage2() {
    return (
      <div className="flex flex-col items-center text-center w-full">
        <div className="grid grid-cols-2 col-span-2">
          <img
            className="m-auto col-span-1"
            width={120}
            height={120}
            src={"/FlowchartsBook/MultipleConditions/food2.png"}
            alt="food."
          />
          <MultipleChoiceQuestion
            question={q1.question}
            answers={q1.answers}
            style={Styles.VERTICAL}
            setCorrect={setQ1Correct}
          />
        </div>
        <img
          width={500}
          height={500}
          src={"/FlowchartsBook/example_3.svg"}
          alt="food."
        />
      </div>
    );
  }

  function getPage3() {
    return (
      <div className="flex flex-col gap-5 w-full h-screen font-semibold text-lg text-center">
        <div className="flex flex-col gap-5 mb-10">
          <Reader text="Let's run through the code and see how it relates to the flowchart!" />
          <Reader text="The flowchart will be constructed as you go through the code." />
        </div>
        <div className="flex flex-col-2 items-start text-center w-full h-100">
          <div className="w-1/2">
            <CodeStep
              props={{
                code: code,
                skipLines: [5, 7, 10, 11, 12],
                enableNext: true,
                getLine: getLine,
              }}
              loop={{exists: false}}
            />
          </div>
          <div className="flex flex-col text-center w-1/2">
            {p2Text !== "" && <Reader text={p2Text} />}
            {currentImage !== "" && (
              <img
                height={imageDim[0]}
                width={imageDim[1]}
                src={currentImage}
                alt="flow chart"
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
