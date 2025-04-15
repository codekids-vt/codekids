import React, { useState, useEffect } from "react";
import { MultipleChoiceQuestion, Styles } from "./Question";

// Each slide is a flat object with a slide number, a code line, and an image (blank if none).
export interface WalkThroughSlide {
  slideNumber: number;
  codeLine: string;
  image: string; // Always provided; if no image, use an empty string.
}

// Each question is associated with a slide number and includes a question string.
export interface WalkThroughQuestion {
  slideNumber: number;
  question: string;
}

// Each answer is associated with a slide number and includes the answer text and correctness.
export interface WalkThroughAnswer {
  slideNumber: number;
  answerText: string;
  answerExplanation: string; // Provide an explanation or an empty string.
  correct: boolean;
}

export interface IWalkThroughCodeWithQuestionsProps {
  headerText?: string;
  slides: WalkThroughSlide[];
  questions: WalkThroughQuestion[];
  answers: WalkThroughAnswer[];
}

interface WalkThroughCodeWithQuestionsWrapperProps {
  props: IWalkThroughCodeWithQuestionsProps;
  setAllowNext: React.Dispatch<React.SetStateAction<boolean>>;
}

export function WalkThroughCodeWithQuestions({
  props,
  setAllowNext,
}: WalkThroughCodeWithQuestionsWrapperProps) {
  const { headerText, slides, questions, answers } = props;
  // Sort slides by slideNumber to ensure proper order.
  const sortedSlides = [...slides].sort(
    (a, b) => a.slideNumber - b.slideNumber,
  );
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [questionCorrect, setQuestionCorrect] = useState(false);

  const currentSlide = sortedSlides[currentSlideIndex];

  // Find question and its answers for the current slide.
  const currentQuestion = questions.find(
    (q) =>
      q.slideNumber === currentSlide.slideNumber && q.question.trim() !== "",
  );

  const currentAnswers = answers
    .filter((a) => a.slideNumber === currentSlide.slideNumber)
    .map((a) => ({
      answerText: a.answerText,
      answerExplanation: a.answerExplanation,
      correct: a.correct,
    }));

  // Next button is enabled if there is no question for this slide or if the question has been answered correctly.
  const isNextEnabled = !currentQuestion || questionCorrect;

  // Signal overall completion when on the last slide and next is enabled.
  useEffect(() => {
    if (currentSlideIndex === sortedSlides.length - 1 && isNextEnabled) {
      setAllowNext(true);
    } else {
      setAllowNext(false);
    }
  }, [currentSlideIndex, isNextEnabled, sortedSlides.length, setAllowNext]);

  const handleNext = () => {
    if (isNextEnabled && currentSlideIndex < sortedSlides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
      setQuestionCorrect(false);
    }
  };

  const handlePrevious = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
      setQuestionCorrect(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center text-center w-full h-full">
      {/* Left side: Code display and navigation */}
      <div className="w-full md:w-1/2 p-4">
        {headerText && <div className="mb-4 font-bold">{headerText}</div>}
        <div className="bg-gray-100 p-4 rounded shadow overflow-auto max-h-[400px]">
          {/* Display all code lines. Highlight the current slide's line. */}
          {sortedSlides.map((slide, index) => (
            <div
              key={slide.slideNumber}
              className={`text-left py-1 px-2 ${
                index === currentSlideIndex ? "bg-yellow-200" : ""
              }`}
            >
              {slide.codeLine}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentSlideIndex === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!isNextEnabled}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      {/* Right side: Image (if any) and question (if applicable) */}
      <div className="w-full md:w-1/2 p-4">
        {currentSlide.image.trim() !== "" && (
          <img
            src={currentSlide.image}
            alt={`Slide ${currentSlide.slideNumber} illustration`}
            className="object-contain max-w-full max-h-full mb-4"
          />
        )}
        {currentQuestion && (
          <div className="mt-4">
            <MultipleChoiceQuestion
              question={currentQuestion.question}
              answers={currentAnswers}
              style={Styles.VERTICAL}
              setCorrect={setQuestionCorrect}
            />
          </div>
        )}
      </div>
    </div>
  );
}
