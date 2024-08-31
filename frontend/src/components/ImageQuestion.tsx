import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MultipleChoiceQuestion } from "./Question";
import { CodeBlock } from "react-code-blocks";

export function ImageQuestion({
  props,
  setAllowNext,
}: {
  props: any;
  setAllowNext: Dispatch<SetStateAction<boolean>>;
}) {
  const [correct, setCorrect] = useState(false);

  useEffect(() => {
    setAllowNext(correct);
  }, [correct, setAllowNext]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <img src={props.image} alt={props.question} className="h-1/2" />
      {props.code !== undefined && props.code !== "" && (
        <div className="m-5">
          <CodeBlock text={props.code} language="python" />
        </div>
      )}
      <MultipleChoiceQuestion
        question={props.question}
        answers={props.answers}
        style={props.style}
        setCorrect={setCorrect}
      />
    </div>
  );
}
