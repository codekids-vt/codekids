"use client"
import React, { useState } from 'react';
import { Reader } from '../Reader';
import { GetWindowScale } from './GetWindowScale';

export function VariableAssignment() {

    const windowScale = GetWindowScale()

    const [q1AnswerExplanation, setQ1AnswerExplanation] = useState("Choose an answer above!")
    const [q2AnswerExplanation, setQ2AnswerExplanation] = useState("Choose an answer above!")

    function handleQ1(correct: boolean, incorrect: number = 0) {
        if(correct) {
            setQ1AnswerExplanation("Correct! anniversary is originally 147 and is then changed to 148.")
        } else {
            switch (incorrect) {
                case 1:
                    setQ1AnswerExplanation("Incorrect. Remember the old value of a variable is lost when it's assigned a new value. Try again!")
                    break;
                case 2:
                    setQ1AnswerExplanation("Incorrect. Assigning a variable a new value DOES NOT add it with the old value. The variable is simply assigned the new value. Try again!")
                    break;
                default:
            }
        }
    }

    function handleQ2(correct: boolean, incorrect: number = 0) {
        if(correct) {
            setQ2AnswerExplanation("Correct! anniversary is reassigned to its previous value + 1 which is 148.")
        } else {
            switch (incorrect) {
                case 1:
                    setQ2AnswerExplanation("Incorrect. anniversary is being set to it's previous value + 1 (anniversary + 1). Not the expression itself.")
                    break;
                case 2:
                    setQ2AnswerExplanation("Incorrect. Notice that anniversary is being reassigned after a year has passed to anniversary + 1")
                    break;
                default:
            }
        }
    }

    return (
        <div style={{textAlign: "center", width: "100%", zoom: windowScale}}>
            <div style={horizontal_div_style}>
                <img style={image_style} src="/VariablesBook/hokie-bird-148.png" alt="Image of Hokie Bird holding 148th birthday sign." />
                <div style={{...code_box_style, ...{transform:"scale(1.5,1.5)"}}}>
                    <p style={code_style}>
                        anniversary = <span style={code_integer_style}>147</span><br/>
                        print(anniversary)<br/>
                        print("A year has passed!")<br/>
                        anniversary = <span style={code_integer_style}>148</span><br/>
                        print(anniversary)<br/>
                    </p>
                </div>
            </div>
            <div style={text_style}><Reader text='What is printed when this program runs?'/></div>
            <div style={horizontal_div_style}>
                <button style={answer_button_style} onClick={() => handleQ1(true)}>{"147\nA year has passed!\n148"}</button>
                <button style={answer_button_style} onClick={() => handleQ1(false, 1)}>{"147\nA year has passed!\n147"}</button>
                <button style={answer_button_style} onClick={() => handleQ1(false, 2)}>{"147\nA year has passed!\n295"}</button>
            </div>
            <div style={answer_explanation_style}><Reader text={q1AnswerExplanation}/></div>
            <div style={{...code_box_style, ...{transform:"scale(1.2,1.2)"}}}>
                <p>
                    anniversary = <span style={code_integer_style}>147</span><br/>
                    print(anniversary)<br/>
                    print("A year has passed!")<br/>
                    anniversary = anniversary + <span style={code_integer_style}>1</span><br/>
                    print(anniversary)<br/>
                </p>
            </div>
            <div style={text_style}><Reader text='What is printed when this program runs?'/></div>
            <div style={horizontal_div_style}>
                <button style={answer_button_style} onClick={() => handleQ2(true)}>{"147\nA year has passed!\n148"}</button>
                <button style={answer_button_style} onClick={() => handleQ2(false, 1)}>{"147\nA year has passed!\naniversary + 1"}</button>
                <button style={answer_button_style} onClick={() => handleQ2(false, 2)}>{"147\nA year has passed!\n147"}</button>
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
    margin: "1% 0",
    height: "fit-content"
}

const text_style = {
    fontWeight: "600",
    fontSize: "1.5rem",
    lineHeight: "2rem",
    textAlign: "center" as "center"
}

const code_style = {
    fontWeight: "400",
    fontSize: "1rem",
    width: "fit-content"
}

const image_style = {
    marginLeft: "auto", 
    marginRight: "auto",
    display: "block"
}

const code_integer_style = {
    color: "#ff6371"
}

const answer_button_style = {
    backgroundColor: "#D1D5DB",
    color: "black",
    fontSize: "20px",
    border: "1px solid gray",
    borderRadius: "30px",
    padding: "15px 30px",
    cursor: "pointer",
    whiteSpace: "pre-wrap" as "pre-wrap"
}

const code_box_style = {
    textAlign: "left" as "left", 
    backgroundColor: "#E8E8E8",
    width: "fit-content",
    margin: "3% auto",
    padding: "3%"
}

const answer_explanation_style = {
    marginBottom: "3%",
    fontSize: "1.2rem",
}