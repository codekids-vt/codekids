import React, { useState } from "react";
import { Reader } from "../Reader";
import { CodeSnippet } from "../CodeSnippet";
import { MultipleChoiceQuestion, Styles } from "../Question";
import { TypeStyle, Type } from "../TypeStyle";
import { IfStatementsQuestions } from "../../util/QuestionBank";

export function LogicalOperators({
  props,
  setAllowNext,
}: {
  props: any;
  setAllowNext: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const q1 = IfStatementsQuestions["LogicalOperatorsQ1"];
  const q2 = IfStatementsQuestions["LogicalOperatorsQ2"];
  const q3 = IfStatementsQuestions["LogicalOperatorsQ3"];

  const snippetCode = (
    <p>
      derek_color = <TypeStyle text="'cream'" style={Type.STRING} />
      <br />
      wagner_color = <TypeStyle text="'black'" style={Type.STRING} />
      <br />
      josie_color = <TypeStyle text="'cream'" style={Type.STRING} />
    </p>
  );

  const [q1ChosenAnswer, setQ1ChosenAnswer] = useState("?");
  const [q2ChosenAnswer, setQ2ChosenAnswer] = useState("?");
  const [q3ChosenAnswer, setQ3ChosenAnswer] = useState("?");

  const [q1Correct, setQ1Correct] = useState(false);
  const [q2Correct, setQ2Correct] = useState(false);
  const [q3Correct, setQ3Correct] = useState(false);

  React.useEffect(() => {
    if (props.pageNumber === 2) {
      setAllowNext(q1Correct);
    } else if (props.pageNumber === 3) {
      setAllowNext(q2Correct);
    } else if (props.pageNumber === 4) {
      setAllowNext(q3Correct);
    }
  }, [q1Correct, q2Correct, q3Correct, props.pageNumber, setAllowNext]);

  function handleQ1(button: HTMLButtonElement) {
    setQ1ChosenAnswer(button.textContent !== null ? button.textContent : "?");
  }

  function handleQ2(button: HTMLButtonElement) {
    setQ2ChosenAnswer(button.textContent !== null ? button.textContent : "?");
  }

  function handleQ3(button: HTMLButtonElement) {
    setQ3ChosenAnswer(button.textContent !== null ? button.textContent : "?");
  }

  if (props.pageNumber === 1) {
    return getPage1();
  } else if (props.pageNumber === 2) {
    return getPage2();
  } else if (props.pageNumber === 3) {
    return getPage3();
  } else {
    return getPage4();
  }

  function codeSnippet() {
    return (
      <div className="flex flex-col-2 m-5 items-center gap-36">
        <img
          width={300}
          height={300}
          src="/IfStatementsBook/therapy_dog_1.png"
          alt="therapy dogs with their names."
        />
        <div>
          <Reader text="Use the code snippet below to answer the question." />
          <CodeSnippet code={snippetCode} />
        </div>
      </div>
    );
  }

  function getPage1() {
    return (
      <div className="flex flex-col w-full items-center font-semibold text-lg text-center gap-3">
        {codeSnippet()}
        <Reader text="The next few pages will have questions about the code above and logical operators." />
      </div>
    );
  }

  function getPage2() {
    return (
      <div className="flex flex-col w-full items-center font-semibold text-lg text-center gap-3">
        {codeSnippet()}
        <Reader text="AND Operator" />
        <Reader text='Simply ask "are both of these true?"' />
        <div className="text-base">
          (derek_color == <TypeStyle text="'cream'" style={Type.STRING} />){" "}
          <TypeStyle text="and" style={Type.BOOLEAN} /> (josie_color =={" "}
          <TypeStyle text="'cream'" style={Type.STRING} />) ={" "}
          <TypeStyle text={q1ChosenAnswer} style={Type.BOOLEAN} />
        </div>
        <MultipleChoiceQuestion
          question={q1.question}
          answers={q1.answers}
          style={Styles.HORIZONTAL}
          setCorrect={setQ1Correct}
          buttonPressed={handleQ1}
        />
      </div>
    );
  }

  function getPage3() {
    return (
      <div className="flex flex-col w-full items-center font-semibold text-lg text-center gap-3">
        {codeSnippet()}
        <Reader text="OR Operator" />
        <Reader text='Simply ask "are either of these true?"' />
        <div className="text-base">
          (derek_color == <TypeStyle text="'cream'" style={Type.STRING} />){" "}
          <TypeStyle text="or" style={Type.BOOLEAN} /> (wagner_color =={" "}
          <TypeStyle text="'cream'" style={Type.STRING} />) ={" "}
          <TypeStyle text={q2ChosenAnswer} style={Type.BOOLEAN} />
        </div>
        <MultipleChoiceQuestion
          question={q2.question}
          answers={q2.answers}
          style={Styles.HORIZONTAL}
          setCorrect={setQ2Correct}
          buttonPressed={handleQ2}
        />
      </div>
    );
  }

  function getPage4() {
    return (
      <div className="flex flex-col w-full items-center font-semibold text-lg text-center gap-3">
        {codeSnippet()}
        <Reader text="NOT Operator" />
        <Reader text='Simply ask "what is the opposite?"' />
        <div className="text-base">
          <TypeStyle text="not" style={Type.BOOLEAN} />
          (derek_color == <TypeStyle text="'cream'" style={Type.STRING} />) ={" "}
          <TypeStyle text={q3ChosenAnswer} style={Type.BOOLEAN} />
        </div>
        <MultipleChoiceQuestion
          question={q3.question}
          answers={q3.answers}
          style={Styles.HORIZONTAL}
          setCorrect={setQ3Correct}
          buttonPressed={handleQ3}
        />
      </div>
    );
  }
}
