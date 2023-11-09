"use client"
import React, { useState, useEffect } from 'react';
import { Reader } from '../Reader';
import { GetWindowScale } from './GetWindowScale';

export function IntsAndBools() {

    const windowScale = GetWindowScale()

    const [q1ChosenAnswer, setQ1ChosenAnswer] = useState("?")
    const [q1AnswerExplanation, setQ1AnswerExplanation] = useState("Choose an answer above!")
    const [q2AnswerExplanation, setQ2AnswerExplanation] = useState("Choose an answer above!")
    const [dataTypeStyle, setDataTypeStyle] = useState(code_integer_style)

    function answerButtonClick(answer: string, questionNumber: number, correct: boolean = false)
    {
        if(questionNumber === 1) {
            handleQ1(answer, correct)
        } else if(questionNumber === 2) {
            handleQ2(answer, correct)
        }
    }

    function handleQ1(answer: string, correct: boolean) {
        setQ1ChosenAnswer(answer)
        if(correct) {
            setQ1AnswerExplanation("Correct! The Hokies scored 38 points which is an Integer!")
            setDataTypeStyle(code_integer_style)
        } else {
            switch (answer) {
                case "False":
                    setQ1AnswerExplanation("Incorrect. False is a Boolean, not an Integer. Try again!")
                    setDataTypeStyle(code_boolean_style)
                    break;
                case "10":
                    setQ1AnswerExplanation("Incorrect. 10 is an Integer. However, it's not the score of the Hokies. Try Again!")
                    setDataTypeStyle(code_integer_style)
                    break;
                case "'38'":
                    setQ1AnswerExplanation("Incorrect. '38' is a string since it's surrouned by single quotations. Try again!")
                    setDataTypeStyle(code_string_style)
                    break;
                default:
            }
        }
    }

    function handleQ2(answer: string, correct: boolean) {
        if(correct) {
            setQ2AnswerExplanation("Correct! hokies_score is greater than syracuse_score so win is True!")
        } else {
            switch(answer) {
                case "False":
                    setQ2AnswerExplanation("Incorrect. Is hokies_score greater than syracuse_score? Try again!")
                    break;
                case "22":
                    setQ2AnswerExplanation("Incorrect. Remember 22 is an Integer. The result of hokies_score > syracuse_score will be a Boolean.")
                    break;
                case "10":
                    setQ2AnswerExplanation("Incorrect. Remember 10 is an Integer. The result of hokies_score > syracuse_score will be a Boolean.")
                    break;
                default:
            }
        }
    }


    return (
        <div style={{textAlign: "center", width: "100%", zoom: windowScale}}>
            <img style={image_style} src="/VariablesBook/vt_syracuse_score.png" alt="Image of football score between Virginia Tech and Syracuse" />
            <span style={text_style}><Reader text='What is the correct integer value of the following?'/></span>
            <p style={code_style}>hokies_score = <span style={dataTypeStyle}>{q1ChosenAnswer}</span></p>
            <div style={horizontal_div_style}>
                <button style={answer_button_style} type='button' onClick={() => answerButtonClick("False", 1)}>False</button>
                <button style={answer_button_style} type='button' onClick={() => answerButtonClick("38", 1, true)}>38</button>
                <button style={answer_button_style} type='button' onClick={() => answerButtonClick("10", 1)}>10</button>
                <button style={answer_button_style} type='button' onClick={() => answerButtonClick("'38'", 1)}>'38'</button>
            </div>
            <div style={answer_explanation_style}><Reader text={q1AnswerExplanation}/></div>
            <span style={text_style}><Reader text="What is the variable 'win' evaluted to?"/></span>
            <div style={code_box_style}>
                <p>syracuse_score = <span style={code_integer_style}>10</span><br/>win = hokies_score &gt; syracuse_score</p>
            </div>
            <div style={horizontal_div_style}>
                <button style={answer_button_style} type='button' onClick={() => answerButtonClick("False", 2)}>False</button>
                <button style={answer_button_style} type='button' onClick={() => answerButtonClick("22", 2)}>22</button>
                <button style={answer_button_style} type='button' onClick={() => answerButtonClick("10", 2)}>10</button>
                <button style={answer_button_style} type='button' onClick={() => answerButtonClick("True", 2, true)}>True</button>
            </div>
            <div style={answer_explanation_style}><Reader text={q2AnswerExplanation}/></div>
        </div>
    );

}

const horizontal_div_style = {
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: "5%",
    margin: "3%",
}

const text_style = {
    fontWeight: "600",
    fontSize: "1.5rem",
    lineHeight: "2rem",
    textAlign: "center" as "center"
}

const code_style = {
    fontWeight: "400",
    fontSize: "1.5rem"
}

const image_style = {
    marginLeft: "auto", 
    marginRight: "auto",
    marginTop : "5%",
    marginBottom: "5%", 
    display: "block"
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

const answer_button_style = {
    backgroundColor: "#D1D5DB",
    color: "black",
    fontSize: "20px",
    border: "1px solid grey",
    borderRadius: "30px",
    padding: "15px 50px",
    cursor: "pointer"
}

const code_box_style = {
    textAlign: "left" as "left", 
    backgroundColor: "#E8E8E8",
    width: "fit-content",
    margin: "5% auto",
    padding: "3%"
}

const answer_explanation_style = {
    marginBottom: "3%",
    fontSize: "1.2rem",
}