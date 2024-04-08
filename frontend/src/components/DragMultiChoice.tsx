import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Option = {
  text: string;
  image?: string;
};

type Question = {
  text: string;
  answer: string;
};

interface DragMultiChoiceProps {
  props: {
    options: Option[];
    questions: Question[];
  };
  setAllowNext: Dispatch<SetStateAction<boolean>>;
}

export const DragMultiChoice: React.FC<DragMultiChoiceProps> = ({
  props,
  setAllowNext,
}) => {
  const [correct, setCorrect] = useState<boolean>(false);
  const [currentAnswers, setCurrentAnswers] = useState<string[]>([]);
  const { options, questions } = props;

  useEffect(() => {
    setAllowNext(correct);
  }, [correct, setAllowNext]);

  return (
    <div className="flex flex-row gap-10 p-5">
      <div className="flex flex-col items-start gap-4">
        {options.map((option: Option, index: number) => (
          <div
            key={index}
            className="flex items-center gap-2 p-2 bg-white shadow-md rounded-lg cursor-pointer hover:bg-gray-50"
            draggable
          >
            {option.image && (
              <img
                src={option.image}
                alt={option.text}
                className="w-16 h-16 object-cover rounded-md"
              />
            )}
            <p className="text-gray-800 font-medium">{option.text}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-start gap-4">
        {questions.map((question: Question, index: number) => (
          <div
            key={index}
            className="flex items-center gap-2 p-2 bg-white shadow-md rounded-lg"
          >
            <p className="text-gray-800 font-medium flex-1">{question.text}</p>
            <div
              className="dropzone flex justify-center items-center w-32 h-12 bg-blue-100 rounded-lg text-blue-800 font-semibold cursor-pointer hover:bg-blue-200"
              onDrop={(e) => {
                e.preventDefault();
                const data = e.dataTransfer.getData("text");
                if (data === question.answer) {
                  setCorrect(true);
                }
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              Drop here
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
