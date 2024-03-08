import React, { useState } from "react";
import { Reader } from "../../Reader";
import { PythonTutor } from "../../PythonTutor";
import { MultipleChoiceQuestion, Styles } from "../../Question";
import { LifeOfMooseQuestions } from "../../../util/QuestionBank";
import { QuestionSet } from "../../QuestionSet";

export interface ILifeOfMooseProps {
  pageNumber: number;
}

const code =
  "moose_name = 'Moose'\nprint(moose_name)\nmoose_birthday = '02/13/2012'\nprint(moose_birthday)\nmoose_color = 'cream'\nprint(moose_color)\n" +
  "moose_breed = 'Labrador Retriever'\nprint(moose_breed)";

export function LifeOfMoose({
  props,
  setAllowNext,
}: {
  props: any | ILifeOfMooseProps;
  setAllowNext: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const q1 = LifeOfMooseQuestions["LifeOfMooseQ1"];
  const q2 = LifeOfMooseQuestions["LifeOfMooseQ2"];
  const q3 = LifeOfMooseQuestions["LifeOfMooseQ3"];
  const q4 = LifeOfMooseQuestions["LifeOfMooseQ4"];

  const [q1Correct, setQ1Correct] = useState(false);
  const [q2Correct, setQ2Correct] = useState(false);
  const [q3Correct, setQ3Correct] = useState(false);
  const [q4Correct, setQ4Correct] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentInstruction, setCurrentInstruction] = useState(0);
  const [reload, setReload] = useState(0);

  React.useEffect(() => {
    if (props.pageNumber === 2) {
      setAllowNext(q1Correct && q2Correct && q3Correct && q4Correct);
    }
  }, [
    q1Correct,
    q2Correct,
    q3Correct,
    q4Correct,
    props.pageNumber,
    setAllowNext,
  ]);

  function getCurrentQuestion(questionNumber: number) {
    setCurrentQuestion(questionNumber);
  }

  function getInstructionToJumpTo() {
    switch (currentQuestion) {
      case 0:
        return 0;
      case 1:
        return 2;
      case 2:
        return 4;
      case 3:
        return 6;
      default:
        return 0;
    }
  }

  if (props.pageNumber === 1) {
    return getPage1();
  } else {
    return getPage2();
  }

  function getPage1() {
    return (
      <div className="flex flex-col w-full h-full items-center font-semibold text-lg text-center gap-3">
        <img
          className="w-20 h-20 xl:w-52 xl:h-52"
          width={500}
          height={500}
          src={"/LifeOfMoose/moose_2.png"}
          alt="Moose"
        />
        <Reader text="First look over the code and then answer the following questions!" />
        <PythonTutor props={{ code: code }} />
      </div>
    );
  }

  function getPage2() {
    return (
      <div className="flex w-full h-full text-center items-start gap-5">
        <div className="w-1/2 h-full">
          <PythonTutor
            props={{
              code: code,
              instruction: currentInstruction,
              reload: reload,
            }}
          />
        </div>
        <div className="flex flex-col gap-5 w-1/2 items-center">
          <QuestionSet
            correctAnswers={[q1Correct, q2Correct, q3Correct, q4Correct]}
            getCurrentQuestion={getCurrentQuestion}
          >
            <MultipleChoiceQuestion
              question={q1.question}
              answers={q1.answers}
              style={Styles.HORIZONTAL}
              setCorrect={setQ1Correct}
            />
            <MultipleChoiceQuestion
              question={q2.question}
              answers={q2.answers}
              style={Styles.HORIZONTAL}
              setCorrect={setQ2Correct}
            />
            <MultipleChoiceQuestion
              question={q3.question}
              answers={q3.answers}
              style={Styles.HORIZONTAL}
              setCorrect={setQ3Correct}
            />
            <MultipleChoiceQuestion
              question={q4.question}
              answers={q4.answers}
              style={Styles.HORIZONTAL}
              setCorrect={setQ4Correct}
            />
          </QuestionSet>
          <Reader text="If you get lost, press this button to jump to the correct line in Python Tutor!" />
          <button
            className="border border-solid border-black w-fit py-3 px-5 rounded-3xl cursor-pointer bg-violet-300"
            onClick={() => {
              setCurrentInstruction(getInstructionToJumpTo());
              setReload(reload + 1);
            }}
          >{`Jump to line ${getInstructionToJumpTo() + 1}`}</button>
        </div>
      </div>
    );
  }
}
