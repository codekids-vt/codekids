"use client"
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Reader } from '../Reader';
import { GetWindowScale } from './GetWindowScale';
import Image from 'next/image'

export function Sequencing({ props, setAllowNext }: { props: any, setAllowNext: Dispatch<SetStateAction<boolean>> }) {

    const windowScale = GetWindowScale()

    const [q1AnswerExplanation, setQ1AnswerExplanation] = useState("Choose an answer above!")

    const [q1Correct, setQ1Correct] = useState(false)

    React.useEffect(() => {
        setAllowNext(q1Correct)
    }, [q1Correct])

    function handleQ1(correct : boolean, incorrect : string = "") {
        if(correct) {
            setQ1AnswerExplanation("Correct! different is assigned before hokies_score and syracuse_score were reassigned. So different is assigned 28.")
            setQ1Correct(true)
        } else {
            switch (incorrect) {
                case "15":
                    setQ1AnswerExplanation("Incorrect. It is not 15. Read the code from top to bottom. What is different assigned to? Try again!")
                    break;
                case "0":
                    setQ1AnswerExplanation("Incorrect. It is not 0. Read the code from top to bottom. What is different assigned to? Try again!")
                    break;
                case "1":
                    setQ1AnswerExplanation("Incorrect. Read the code from top to bottom. Notice different is assigned before hokies_score is reassigned to 23 and syracuse_score is reassigned to 22. What is different assigned to? Try again!")
                    break;
                default:
            }
        }
    }

    return (
        <div style={{textAlign: "center", width: "100%", zoom: windowScale}}>
            <Image style={image_style} width={400} height={400} src='/VariablesBook/vt_syracuse_score.png' alt="Image of therapy dogs with their names."/>
            <div style={text_style}><Reader text='We always read the code from top to bottom. The line numbers have been provided. (Leftmost column of numbers)'/></div>
            <div style={code_box_style}>
                <p style={code_style}>
                    {
                        "1\tsyracuse_score = 10\n" +
                        "2\thokies_score = 38\n" +
                        "3\tdifferent = hokies_score - syracuse_score\n" +
                        "4\thokies_score = 23\n" +
                        "5\tsyracuse_score = 22\n" +
                        "6\tprint(different)"
                    }
                </p>
            </div>
            <div><Reader text='What is printed when print(different) is called at the end?'/></div>
            <div style={horizontal_div_style}>
                <button style={answer_button_style} onClick={() => handleQ1(false, "15")}>15</button>
                <button style={answer_button_style} onClick={() => handleQ1(false, "0")}>0</button>
                <button style={answer_button_style} onClick={() => handleQ1(true)}>28</button>
                <button style={answer_button_style} onClick={() => handleQ1(false, "1")}>1</button>
            </div>
            <div style={answer_explanation_style}><Reader text={q1AnswerExplanation}/></div>
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
    cursor: "pointer",
    whiteSpace: "pre-wrap" as "pre-wrap"
}

const code_box_style = {
    textAlign: "left" as "left", 
    backgroundColor: "#E8E8E8",
    width: "fit-content",
    margin: "5% auto",
    padding: "3%",
    whiteSpace: "pre-wrap" as "pre-wrap"
}

const answer_explanation_style = {
    marginBottom: "3%",
    fontSize: "1.2rem",
}