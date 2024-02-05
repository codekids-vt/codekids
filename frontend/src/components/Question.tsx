import React, { useState } from "react";
import { Reader } from "./Reader";

export interface IQuestionProps {
    question: string,
    answers: IAnswer[],
    style: Styles,
    setCorrect: React.Dispatch<React.SetStateAction<boolean>>,
    buttonPressed? : (button : HTMLButtonElement) => void // Optional function to get the button that was pressed
}

export enum Styles {
    HORIZONTAL,
    VERTICAL,
    GRID2
}

export interface IAnswer {
    answerText: string,
    answerExplanation: string,
    correct: boolean,
}

export function MultipleChoiceQuestion({question, answers, style, setCorrect, buttonPressed} : IQuestionProps) {

    var layout : string = ""
    const buttonStyle = "text-base bg-gray-200 text-black border border-solid border-black rounded-3xl py-3.5 px-12 cursor-pointer whitespace-pre-wrap"
    const answerWrong = "text-base bg-red-400 text-black border border-solid border-black rounded-3xl py-3.5 px-12 cursor-pointer whitespace-pre-wrap"
    const answerRight = "text-base bg-green-400 text-black border border-solid border-black rounded-3xl py-3.5 px-12 cursor-pointer whitespace-pre-wrap"
    
    const [answerExplanation, setAnswerExplanation] = useState("Choose an answer above!")
    const [buttonStyles, setButtonStyles] = useState(Array(answers.length).fill(buttonStyle))

    function handleQuestion(answerExplanation: string, correct: boolean, button: HTMLButtonElement, index: number) {
        setAnswerExplanation(answerExplanation)
        setCorrect(correct)
        changeButtonColor(index, correct);
        if(buttonPressed !== undefined) {
            buttonPressed(button)
        }
    }

    function changeButtonColor(index: number, correct: boolean) {
        var newButtonStyles = Array(answers.length).fill(buttonStyle);
        newButtonStyles[index] = correct ? answerRight : answerWrong;
        setButtonStyles(newButtonStyles);
    }

    if(style === Styles.VERTICAL) {
        layout = 'flex flex-col mx-auto w-fit gap-5 m-5'
    } else if (style === Styles.HORIZONTAL) {
        layout = 'flex gap-10 justify-center mb-5'
    } else if (style === Styles.GRID2) {
        layout = "grid grid-cols-2 gap-5 m-2 w-full"
    }

    return (
        <div className="w-full px-36">
            {question !== '' && <div className="font-semibold text-lg leading-8 text-center mb-3"><Reader text={question}/></div>}
            <div className={layout}>
                {answers.map((answer, index) => <button className={buttonStyles[index]} key={index} onClick={(e) => handleQuestion(answer.answerExplanation, answer.correct, e.currentTarget, index)}>{answer.answerText}</button>)}
            </div>
            <div className="font-normal text-base text-center"><Reader text={answerExplanation}/></div>
        </div>
    );    
    


    
}