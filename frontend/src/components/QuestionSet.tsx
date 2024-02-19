import { useState } from "react";

export function QuestionSet({
  children,
  correctAnswers,
}: {
  children: React.ReactElement[];
  correctAnswers: boolean[];
}) {
  const prevButtonStyle =
    "text-base bg-red-400 text-black border border-solid border-black rounded-3xl py-3.5 px-12 cursor-pointer whitespace-pre-wrap disabled:opacity-50";
  const nextButtonStyle =
    "text-base bg-green-400 text-black border border-solid border-black rounded-3xl py-3.5 px-12 cursor-pointer whitespace-pre-wrap disabled:opacity-50";
  const border = "border-4 border-lime-300 p-4";

  const [currentQuestion, setCurrentQuestion] = useState(0);

  function canAdvance(): boolean {
    if (currentQuestion === children.length - 1) {
      return false;
    }
    return correctAnswers[currentQuestion];
  }

  return (
    <div className={`flex flex-col items-center gap-5 w-full p-5 ${border}`}>
      <p>
        Question {currentQuestion + 1}/{children.length}
      </p>
      {children.map((question, index) => (
        <div hidden={currentQuestion !== index}>{question}</div>
      ))}
      <div className="flex flex-col-2 gap-96">
        <button
          className={prevButtonStyle}
          disabled={currentQuestion === 0}
          onClick={() => {
            setCurrentQuestion(currentQuestion - 1);
          }}
        >
          {"← Previous Question"}
        </button>
        <button
          className={nextButtonStyle}
          disabled={!canAdvance()}
          onClick={() => {
            setCurrentQuestion(currentQuestion + 1);
          }}
        >
          {"Next Question →"}
        </button>
      </div>
    </div>
  );
}
