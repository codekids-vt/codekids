import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Reader } from "./Reader";
import { JSX } from "react/jsx-runtime";

function FillInTheBlank({
  props,
  setAllowNext,
}: {
  props: any;
  setAllowNext: Dispatch<SetStateAction<boolean>>;
}) {
  const { answers, questionText, helpText, description } = props;
  const initialAnswerStyle = Array(answers.length).fill("bg-orange-300");
  const answerButtonStyle =
    "border border-solid border-gray-500 rounded-xl p-[10px] cursor-pointer";

  const [answerSelected, setAnswerSelected] = useState("");
  const [answerSelectedStyle, setAnswerSelectedStyle] =
    useState(initialAnswerStyle);
  const [blanksTyped, setBlanksTyped] = useState<string[]>(
    Array(questionText.split("%B").length - 1).fill(""),
  );
  const [answerExplanation, setAnswerExplanation] = useState(helpText.start);
  const [correct, setCorrect] = useState(false);

  useEffect(() => {
    setAllowNext(correct);
  }, [correct, setAllowNext]);

  function blankPressed(e: EventTarget & HTMLInputElement) {
    if (answerSelected === "") return;
    blanksTyped[parseInt(e.id)] = answerSelected;
    setBlanksTyped(blanksTyped);
    setAnswerSelected("");
    setAnswerSelectedStyle(initialAnswerStyle);
  }

  function answerPressed(e: EventTarget & HTMLButtonElement) {
    var newSelected = Array(answers.length).fill("bg-orange-300");
    if (answerSelectedStyle[parseInt(e.id)] === "bg-orange-400") {
      setAnswerSelected("");
      setAnswerSelectedStyle(newSelected);
      return;
    }
    if (e.textContent !== null) {
      setAnswerSelected(e.textContent);
      newSelected[parseInt(e.id)] = "bg-orange-400";
      setAnswerSelectedStyle(newSelected);
    }
  }

  function generateQuestionText() {
    const split = questionText.split("%B");
    let blanks: string[] = [];
    let generatedQuestion: (string | JSX.Element)[] = [];
    split.forEach((text: string, index: number) => {
      blanks.push("");
      generatedQuestion.push(
        ...[
          text,
          <input
            id={index.toString()}
            onClick={(e) => blankPressed(e.currentTarget)}
            className="px-1 bg-orange-100 hover:bg-orange-50 w-28 lg:text-lg md:text-md sm:text-sm"
            type="text"
            value={blanksTyped[index]}
            onChange={(e) => onBlankChanged(e)}
            onDrop={(e) => handleOnDrop(e, index)}
            onDragOver={handleDragOver}
          />,
        ],
      );
    });
    generatedQuestion.pop(); // Removes final input
    return generatedQuestion;
  }

  function onBlankChanged(e: React.ChangeEvent<HTMLInputElement>) {
    const copy = JSON.parse(JSON.stringify(blanksTyped));
    copy[parseInt(e.target.id)] = e.target.value;
    setBlanksTyped(copy);
  }

  function resetPressed() {
    setBlanksTyped(Array(questionText.split("%B").length - 1).fill(""));
    setAnswerSelected("");
    setAnswerSelectedStyle(initialAnswerStyle);
    setAnswerExplanation(helpText.start);
  }

  function submitPressed() {
    const finalAnswers = blanksTyped.map((finalAnswer: string) =>
      finalAnswer.replace(/\s/g, ""),
    );
    let allCorrect = true;
    answers.forEach((answer: any) => {
      if (isNaN(answer.correct)) return;
      const num = parseInt(answer.correct) - 1;
      if (num < 0 || num > blanksTyped.length - 1) return;
      if (answer.text.replace(/\s/g, "") !== finalAnswers[num])
        allCorrect = false;
    });
    setCorrect(allCorrect);
    setAnswerExplanation(allCorrect ? helpText.correct : helpText.incorrect);
  }

  const handleOnDrag = (e: React.DragEvent, answerText: string) => {
    e.dataTransfer.setData("answerText", answerText);
  };

  const handleOnDrop = (e: React.DragEvent, blankIndex: number) => {
    const answerText = e.dataTransfer.getData("answerText") as string;
    const copy = JSON.parse(JSON.stringify(blanksTyped));
    copy[blankIndex] = answerText;
    setBlanksTyped(copy);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {props.image && props.image !== "" && (
        <div>
          <img src={props.image} alt={props.image} />
        </div>
      )}
      <div className="flex gap-10 items-center mt-8 w-full">
        {description && description !== "" && (
          <div className="flex flex-col w-1/2 items-center gap-5 font-bold text-center">
            {description.map((text: string, index: number) => (
              <Reader key={text + index} text={text} />
            ))}
          </div>
        )}
        <div
          className={`flex flex-col gap-5 items-center ${description && description !== "" ? "w-1/2" : ""}`}
        >
          <div className="bg-orange-300 border-2 rounded-md border-black p-10 text-left whitespace-pre-wrap">
            {generateQuestionText()}
          </div>
          <div className="flex gap-10">
            {answers.map((answer: any, index: number) => (
              <button
                id={index.toString()}
                key={answer + index}
                className={`${answerButtonStyle} ${answerSelectedStyle[index]}`}
                type="button"
                onClick={(e) => answerPressed(e.currentTarget)}
                draggable
                onDragStart={(e) => handleOnDrag(e, answer.text)}
              >
                {answer.text}
              </button>
            ))}
          </div>
          <div className="flex gap-10">
            <button
              className="bg-red-400 py-3 px-10 border-2 border-gray-500 rounded-md"
              type="button"
              onClick={() => resetPressed()}
            >
              Reset
            </button>
            <button
              className="bg-green-400 py-3 px-10 border-2 border-gray-500 rounded-md"
              type="button"
              onClick={() => submitPressed()}
            >
              Submit
            </button>
          </div>
          <div className="text-center">
            <Reader text={answerExplanation} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FillInTheBlank;
