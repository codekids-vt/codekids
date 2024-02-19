import React, { Dispatch, SetStateAction, useState } from "react";
import { Reader } from "../../Reader";
import { PythonTutor } from "../../PythonTutor";
import { LifeOfMooseQuestions } from "../../../util/QuestionBank";
import { MultipleChoiceQuestion, Styles } from "../../Question";
import { QuestionSet } from "../../QuestionSet";

export interface IMooseMilestoneProps {
  pageNumber: number;
}

const code =
  "moose_birth = 2012\nmilestone_year = 2019\nmoose_age = milestone_year - moose_birth\nprint(moose_age)";

export function MooseMilestone({
  props,
  setAllowNext,
}: {
  props: any | IMooseMilestoneProps;
  setAllowNext: Dispatch<SetStateAction<boolean>>;
}) {
  const q1 = LifeOfMooseQuestions["MooseMilestoneQ1"];
  const q2 = LifeOfMooseQuestions["MooseMilestoneQ2"];
  const q3 = LifeOfMooseQuestions["MooseMilestoneQ3"];
  const q4 = LifeOfMooseQuestions["MooseMilestoneQ4"];

  const [q1Correct, setQ1Correct] = useState(false);
  const [q2Correct, setQ2Correct] = useState(false);
  const [q3Correct, setQ3Correct] = useState(false);
  const [q4Correct, setQ4Correct] = useState(false);

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

  if (props.pageNumber === 1) {
    return getPage1();
  } else {
    return getPage2();
  }

  function getPage1() {
    return (
      <div className="flex flex-col w-full h-full items-center font-semibold text-lg text-center gap-3">
        <Reader text="Remarkable milestones for Moose!" />
        <img
          width={400}
          height={400}
          className="w-20 h-20 xl:w-52 xl:h-52"
          src={"/LifeOfMoose/moose_milestone.png"}
          alt="Moose"
        />
        <PythonTutor props={{ code: code }} />
        <Reader text="Take a look at the code. What do you think will be printed at the end? We will trace the code in the next page." />
      </div>
    );
  }

  function getPage2() {
    return (
      <div className="flex flex-col w-full h-full text-center items-center gap-5">
        <PythonTutor props={{ code: code }} />
        <QuestionSet
          correctAnswers={[q1Correct, q2Correct, q3Correct, q4Correct]}
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
      </div>
    );
  }
}
