import React, { useState } from "react";
import { CodeSnippet } from "../CodeSnippet";
import { MultipleChoiceQuestion, Styles } from "../Question";
import { TypeStyle, Type } from "../TypeStyle";
import { IfStatementsQuestions } from "../../util/QuestionBank";

export interface IConditionalOperatorsProps {
  pageNumber: number;
}

export function ConditionalOperators({
  props,
  setAllowNext,
}: {
  props: any | IConditionalOperatorsProps;
  setAllowNext: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const image = (
    <img
      width={300}
      height={300}
      src={"/IfStatementsBook/therapy_dog_1.png"}
      alt="Therapy dogs with their names."
    />
  );

  const q1 = IfStatementsQuestions["ConditionalOperatorsQ1"];
  const q2 = IfStatementsQuestions["ConditionalOperatorsQ2"];
  const q3 = IfStatementsQuestions["ConditionalOperatorsQ3"];
  const q4 = IfStatementsQuestions["ConditionalOperatorsQ4"];
  const q5 = IfStatementsQuestions["ConditionalOperatorsQ5"];

  const [q1ChosenAnswer, setQ1ChosenAnswer] = useState("?");
  const [q2ChosenAnswer, setQ2ChosenAnswer] = useState("?");
  const [q3ChosenAnswer, setQ3ChosenAnswer] = useState("?");
  const [q4ChosenAnswer, setQ4ChosenAnswer] = useState("?");
  const [q5ChosenAnswer, setQ5ChosenAnswer] = useState("?");

  const [q1Correct, setQ1Correct] = useState(false);
  const [q2Correct, setQ2Correct] = useState(false);
  const [q3Correct, setQ3Correct] = useState(false);
  const [q4Correct, setQ4Correct] = useState(false);
  const [q5Correct, setQ5Correct] = useState(false);

  const p1Code = (
    <p>
      derek_color = <TypeStyle text="'cream'" style={Type.STRING} />
      <br />
      wagner_color = <TypeStyle text="'black'" style={Type.STRING} />
      <br />
      josie_color = <TypeStyle text="'cream'" style={Type.STRING} />
      <br />
      derek_color == wagner_color ={" "}
      <TypeStyle text={q1ChosenAnswer} style={Type.BOOLEAN} />
    </p>
  );

  const p2Code = (
    <p>
      derek_color = <TypeStyle text="'cream'" style={Type.STRING} />
      <br />
      wagner_color = <TypeStyle text="'black'" style={Type.STRING} />
      <br />
      josie_color = <TypeStyle text="'cream'" style={Type.STRING} />
      <br />
      derek_color == josie_color ={" "}
      <TypeStyle text={q2ChosenAnswer} style={Type.BOOLEAN} />
    </p>
  );

  const p3Code = (
    <p>
      black_number = <TypeStyle text="1" style={Type.INTEGER} />
      <br />
      cream_number = <TypeStyle text="2" style={Type.INTEGER} />
      <br />
      total_number == <TypeStyle text="'3'" style={Type.STRING} />
      <br />
      total_number == (black_number + cream_number) ={" "}
      <TypeStyle text={q3ChosenAnswer} style={Type.BOOLEAN} />
    </p>
  );

  const p4Code = (
    <p>
      black_number = <TypeStyle text="1" style={Type.INTEGER} />
      <br />
      cream_number = <TypeStyle text="2" style={Type.INTEGER} />
      <br />
      total_number == <TypeStyle text="'3'" style={Type.STRING} />
      <br />
      total_number {">"} cream_number ={" "}
      <TypeStyle text={q4ChosenAnswer} style={Type.BOOLEAN} />
    </p>
  );

  const p5Code = (
    <p>
      black_number = <TypeStyle text="1" style={Type.INTEGER} />
      <br />
      cream_number = <TypeStyle text="2" style={Type.INTEGER} />
      <br />
      total_number == <TypeStyle text="3" style={Type.INTEGER} />
      <br />
      total_number {">"} cream_number ={" "}
      <TypeStyle text={q5ChosenAnswer} style={Type.BOOLEAN} />
    </p>
  );

  React.useEffect(() => {
    if (props.pageNumber === 1) {
      setAllowNext(q1Correct);
    } else if (props.pageNumber === 2) {
      setAllowNext(q2Correct);
    } else if (props.pageNumber === 3) {
      setAllowNext(q3Correct);
    } else if (props.pageNumber === 4) {
      setAllowNext(q4Correct);
    } else if (props.pageNumber === 5) {
      setAllowNext(q5Correct);
    }
  }, [
    q1Correct,
    q2Correct,
    q3Correct,
    q4Correct,
    q5Correct,
    props.pageNumber,
    setAllowNext,
  ]);

  function handleQ1(button: HTMLButtonElement) {
    setQ1ChosenAnswer(button.textContent !== null ? button.textContent : "?");
  }

  function handleQ2(button: HTMLButtonElement) {
    setQ2ChosenAnswer(button.textContent !== null ? button.textContent : "?");
  }

  function handleQ3(button: HTMLButtonElement) {
    setQ3ChosenAnswer(button.textContent !== null ? button.textContent : "?");
  }

  function handleQ4(button: HTMLButtonElement) {
    setQ4ChosenAnswer(button.textContent !== null ? button.textContent : "?");
  }

  function handleQ5(button: HTMLButtonElement) {
    setQ5ChosenAnswer(button.textContent !== null ? button.textContent : "?");
  }

  if (props.pageNumber === 1) {
    return getPage1();
  } else if (props.pageNumber === 2) {
    return getPage2();
  } else if (props.pageNumber === 3) {
    return getPage3();
  } else if (props.pageNumber === 4) {
    return getPage4();
  } else {
    return getPage5();
  }

  function getPage1() {
    return (
      <div className="flex flex-col w-full items-center font-semibold text-lg text-center gap-5">
        {image}
        <CodeSnippet code={p1Code} />
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

  function getPage2() {
    return (
      <div className="flex flex-col w-full text-center items-center gap-5">
        {image}
        <CodeSnippet code={p2Code} />
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

  function getPage3() {
    return (
      <div className="flex flex-col w-full text-center items-center gap-5">
        {image}
        <CodeSnippet code={p3Code} />
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

  function getPage4() {
    return (
      <div className="flex flex-col w-full text-center items-center gap-5">
        {image}
        <CodeSnippet code={p4Code} />
        <MultipleChoiceQuestion
          question={q4.question}
          answers={q4.answers}
          style={Styles.HORIZONTAL}
          setCorrect={setQ4Correct}
          buttonPressed={handleQ4}
        />
      </div>
    );
  }

  function getPage5() {
    return (
      <div className="flex flex-col w-full text-center items-center gap-5">
        {image}
        <CodeSnippet code={p5Code} />
        <MultipleChoiceQuestion
          question={q5.question}
          answers={q5.answers}
          style={Styles.HORIZONTAL}
          setCorrect={setQ5Correct}
          buttonPressed={handleQ5}
        />
      </div>
    );
  }
}
