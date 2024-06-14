import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

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
    title: string;
  };
  setAllowNext: Dispatch<SetStateAction<boolean>>;
}

export const DragMultiChoice: React.FC<DragMultiChoiceProps> = ({
  props,
  setAllowNext,
}) => {
  const { options, questions } = props;

  const [answersCorrectness, setAnswersCorrectness] = useState<boolean[]>(
    Array(props.questions.length).fill(false),
  );
  const [availableOptions, setAvailableOptions] = useState<Option[]>(
    props.options,
  );
  const [clickedOption, setClickedOption] = useState<Option | null>(null);
  const [message, setMessage] = useState<{
    text: string;
    correct: boolean;
  } | null>(null);

  useEffect(() => {
    const allCorrect = answersCorrectness.every((correct) => correct);
    setAllowNext(allCorrect);
  }, [answersCorrectness, setAllowNext]);

  const handleDrop = (questionIndex: number, answer: string) => {
    const question = questions[questionIndex];
    const isCorrect = question.answer === answer;
    if (isCorrect) {
      setAnswersCorrectness((prev) => {
        const updated = [...prev];
        updated[questionIndex] = true;
        return updated;
      });
      setAvailableOptions((prev) => {
        const updated = prev.filter((option) => option.text !== answer);
        return updated;
      });
    }
    setMessage({ text: "Incorrect! Try again.", correct: false });
  };

  useEffect(() => {
    if (availableOptions.length === 0) {
      setMessage({ text: "All answers are correct!", correct: true });
    }
  }, [availableOptions, setMessage]);

  return (
    <div className="flex flex-col items-center gap-5 w-full h-full justify-center">
      <div className="text-2xl">{props.title}</div>
      <div className="flex flex-col md:flex-row gap-10 p-5">
        <div className="flex flex-col items-start gap-4">
          <div className="text-xl font-medium">Options</div>
          {availableOptions.map((option, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 p-2 border-2 border-primary-green rounded-xl hover:bg-primary-green hover:text-white cursor-pointer transition duration-300 ease-in-out ${clickedOption?.text === option.text ? "bg-primary-green text-white" : "bg-white text-gray-800"}`}
              draggable
              onDragStart={(e) => e.dataTransfer.setData("text", option.text)}
              onClick={() => setClickedOption(option)}
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
        <div className="hidden md:block h-96 border-r-2 border-gray-200"></div>

        <div className="flex flex-col items-start gap-4">
          <div className="text-xl font-medium">Questions</div>
          {questions.map((question, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 p-2 bg-white shadow-md rounded-lg transition duration-300 ease-in-out ${
                answersCorrectness[index] ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {answersCorrectness[index] ? (
                <div className="flex justify-center items-center w-32 gap-2 p-2 border-2 border-green-500 bg-green-100 rounded-lg text-green-500">
                  {options.find((option) => option.text === question.answer)
                    ?.image && (
                    <img
                      src={
                        options.find(
                          (option) => option.text === question.answer,
                        )?.image
                      }
                      width="32"
                      height="32"
                      alt={question.answer}
                      className="w-8 h-8 object-cover rounded-md"
                    />
                  )}
                  <p className="text-green-500 font-medium text-center">{question.answer}</p>
                </div>
              ) : (
                <div
                  className="flex justify-center items-center w-32 h-12 border-dashed border-2 border-primary-green rounded-lg text-primary-green cursor-pointer transition duration-300 ease-in-out"
                  onDrop={(e) => {
                    e.preventDefault();
                    const data = e.dataTransfer.getData("text");
                    handleDrop(index, data);
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => {
                    if (clickedOption) {
                      handleDrop(index, clickedOption.text);
                      setClickedOption(null);
                    }
                  }}
                >
                  Drop here
                </div>
              )}
              <p className="text-gray-800 font-medium flex-1">
                {question.text}
              </p>
            </div>
          ))}
        </div>
      </div>
      {message && (
        <div
          className={`flex items-center gap-2 p-2 bg-white shadow-md rounded-lg ${
            message.correct ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <p className={message.correct ? "text-green-500" : "text-red-500"}>
            {message.text}
          </p>
        </div>
      )}
    </div>
  );
};
