"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import { Answer, Question, Styles } from '../Question';
import { CodeSnippet } from '../CodeSnippet';

export interface IIntsAndBoolsProps {
    pageNumber: number
}

export function IntsAndBools({ props, setAllowNext }: { props: any | IIntsAndBoolsProps, setAllowNext: React.Dispatch<React.SetStateAction<boolean>> }) {

    const p2Code = <p>hokies_score = <span style={code_integer_style}>38</span><br/>syracuse_score = <span style={code_integer_style}>10</span><br/>win = hokies_score &gt; syracuse_score</p>

    const q1Answers : Answer[] = [
        {
            answerText: "False",
            answerExplanation: "Incorrect. False is a Boolean, not an Integer. Try again!",
            correct: false
        },
        {
            answerText: "38",
            answerExplanation: "Correct! The Hokies scored 38 points which is an Integer!",
            correct: true
        },
        {
            answerText: "10",
            answerExplanation: "Incorrect. 10 is an Integer. However, it's not the score of the Hokies. Try Again!",
            correct: false
        },
        {
            answerText: "'38'",
            answerExplanation: "Incorrect. '38' is a string since it's surrounded by single quotations. Try again!",
            correct: false
        }
    ]

    const q2Answers : Answer[] = [
        {
            answerText: "False",
            answerExplanation: "Incorrect. Is hokies_score greater than syracuse_score? Try again!",
            correct: false
        },
        {
            answerText: "22",
            answerExplanation: "Incorrect. Remember 22 is an Integer. The result of hokies_score > syracuse_score will be a Boolean.",
            correct: false
        },
        {
            answerText: "10",
            answerExplanation: "Incorrect. Remember 10 is an Integer. The result of hokies_score > syracuse_score will be a Boolean.",
            correct: false
        },
        {
            answerText: "True",
            answerExplanation: "Correct! hokies_score is greater than syracuse_score so win is True!",
            correct: true
        }
    ]

    const [q1ChosenAnswer, setQ1ChosenAnswer] = useState("?")
    const [dataTypeStyle, setDataTypeStyle] = useState(code_integer_style)

    const [q1Correct, setQ1Correct] = useState(false)
    const [q2Correct, setQ2Correct] = useState(false)

    useEffect(() => {
        if(props.pageNumber === 1) {
            setAllowNext(q1Correct)
        } else if(props.pageNumber === 2) {
            setAllowNext(q2Correct)
        }
    }, [q1Correct, q2Correct, props.pageNumber, setAllowNext])


    function q1ButtonPressed(button: HTMLButtonElement) {
        if(button.textContent !== null) {
            setQ1ChosenAnswer(button.textContent)
            switch (button.textContent) {
                case "False":
                    setDataTypeStyle(code_boolean_style)
                    break;
                case "10":
                    setDataTypeStyle(code_integer_style)
                    break;
                case "'38'":
                    setDataTypeStyle(code_string_style)
                    break;
                case "38":
                    setDataTypeStyle(code_integer_style)
                default:
            }
        }
    }

    if(props.pageNumber === 1) {
        return getPage1()
    } else if(props.pageNumber === 2) {
        return getPage2()
    }


    function getPage1() {
        return(
            <div className='flex flex-col w-full text-center items-center'>
                <Image className='m-10' width={350} height={350} src={"/VariablesBook/vt_syracuse_score.png"} alt='Image of football score between Virginia Tech and Syracuse'/>
                <div className='mb-5'>
                    <CodeSnippet code={<p>hokies_score = <span style={dataTypeStyle}>{q1ChosenAnswer}</span></p>}/>
                </div>
                <Question question='What is the correct integer value for hokies_score?' answers={q1Answers} style={Styles.HORIZONTAL} setCorrect={setQ1Correct} buttonPressed={q1ButtonPressed}/>
            </div>
        );
    }


    function getPage2() {
        return(
            <div className='flex flex-col w-full text-center items-center'>
                <Image className='m-10' width={350} height={350} src={"/VariablesBook/vt_syracuse_score.png"} alt='Image of football score between Virginia Tech and Syracuse'/>
                <div className='mb-5'><CodeSnippet code={p2Code}/></div>
                <Question question="What is the variable 'win' evaluated to?" answers={q2Answers} style={Styles.HORIZONTAL} setCorrect={setQ2Correct}/>
            </div>
        );
    }

}

const code_string_style = {
    color: "#b87554"
}

const code_boolean_style = {
    color: "#669955"
}

const code_integer_style = {
    color: "#ff6371"
}