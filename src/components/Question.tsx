import React, { Dispatch, SetStateAction, useState } from "react";
import { Reader } from "./Reader";

export interface IQuestionProps {
    question: string,
    answers: Answer[],
    style: Styles,
    setCorrect: React.Dispatch<React.SetStateAction<boolean>>,
    buttonPressed? : (button : HTMLButtonElement) => void // Optional function to get the button that was pressed
}

export enum Styles {
    HORIZONTAL,
    VERTICAL,
}

export interface Answer {
    answerText: string,
    answerExplanation: string,
    correct: boolean,
}

export function Question({question, answers, style, setCorrect, buttonPressed} : IQuestionProps) {

    var layout : string = ""
    const buttonStyle = "text-base bg-gray-200 text-black border border-solid border-black rounded-3xl py-3.5 px-12 cursor-pointer whitespace-pre-wrap"
    
    const [answerExplanation, setAnswerExplanation] = useState("Choose an answer above!")

    function handleQuestion(answerExplanation: string, correct: boolean, button: HTMLButtonElement) {
        setAnswerExplanation(answerExplanation)
        setCorrect(correct)
        if(buttonPressed !== undefined) {
            buttonPressed(button)
        }
    }

    if(style === Styles.VERTICAL) {
        layout = 'flex flex-col mx-auto w-fit gap-5 m-5'
    } else if (style === Styles.HORIZONTAL) {
        layout = 'flex gap-10 justify-center mb-5'
    }

    return (
        <div>
            <div className="font-semibold text-lg leading-8 text-center mb-3"><Reader text={question}/></div>
            <div className={layout}>
                {answers.map((answer, index) => <button className={buttonStyle} key={index} onClick={(e) => handleQuestion(answer.answerExplanation, answer.correct, e.currentTarget)}>{answer.answerText}</button>)}
            </div>
            <div className="font-normal text-base text-center"><Reader text={answerExplanation}/></div>
        </div>
    );    
    
}