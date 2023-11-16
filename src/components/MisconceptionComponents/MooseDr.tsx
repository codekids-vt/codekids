import React, { useState } from 'react';
import { Reader } from '../Reader';
import { GetWindowScale } from './GetWindowScale';
import { PythonTutor } from '../PythonTutor';

export interface IMooseDrProps {
    pageNumber: number
}

const code = "year = 2019\nmoose_title = 'Mr.'\nprint('A year has passed!')\nyear = 2020\nmoose_title = 'Dr.'\nprint(year)\nprint(moose_title)"

export function MooseDr({ props }: { props: any | IMooseDrProps }) {
    const windowScale = GetWindowScale()

    const [q1AnswerExplanation, setQ1AnswerExplanation] = useState("Select an answer above!")
    const [q2AnswerExplanation, setQ2AnswerExplanation] = useState("Select an answer above!")
    const [q3AnswerExplanation, setQ3AnswerExplanation] = useState("Select an answer above!")
    const [q4AnswerExplanation, setQ4AnswerExplanation] = useState("Select an answer above!")

    function handleQ1(correct: boolean) {
        if(correct) {
            setQ1AnswerExplanation("Correct! year is reassigned to 2020 and loses it's old value 2019. Click next again and watch as year is changed to 2020.")
        } else {
            setQ1AnswerExplanation("Incorrect. Remember that when a variable is reassigned, it loses it's old value. Click next again and watch as year is changed to 2020.")
        }
    }

    function handleQ2(correct: boolean) {
        if(correct) {
            setQ2AnswerExplanation("Correct! moose_title is reassigned to the String 'Dr.'")
        } else {
            setQ2AnswerExplanation("Incorrect. Remember that when a variable is reassigned, it loses it's old value. Click next again and watch as moose_title is changed to 'Dr.'")
        }
    }

    function handleQ3(correct: boolean,  incorrect: string = "") {
        if(correct) {
            setQ3AnswerExplanation("Correct! year contains the value 2020. Click the Next button to see it print!")
        } else {
            switch (incorrect) {
                case "2019":
                    setQ3AnswerExplanation("Incorrect. What is year assigned to at this point in the program? Hint: Look at the Global frame section. Try again!")
                    break;
                case "4039":
                    setQ3AnswerExplanation("Incorrect. Remember year was reassigned before and lost it's old value. Hint: Look at the Global frame section. Try again!")
                    break;
                default:
            }
        }
    }

    function handleQ4(correct: boolean,  incorrect: string = "") {
        if(correct) {
            setQ4AnswerExplanation("Correct! moose_title contains the value 'Dr.'. Click the next button to see it print!")
        } else {
            switch (incorrect) {
                case "Mr":
                    setQ4AnswerExplanation("Incorrect. What is moose_title assigned to at this point in the program? Hint: Look at the Global frame section. Try again!")
                    break;
                case "moose_title":
                    setQ4AnswerExplanation("Incorrect. Remember that print() will print the value of a variable. Try again!")
                    break;
                default:
            }
        }
    }

    if(props.pageNumber === 1) {
        return getPage1()
    } else if (props.pageNumber === 2) {
        return getPage2()
    }

    function getPage1() {
        return (
            <div style={whole_container_style}>
                <div style={text_style}><Reader text='Moose becomes a Doctor of Veterinary Medicine!'/></div>
                <img style={{...image_style, width: "50%", height: "auto"}} src='/LifeOfMoose/moose_dr.png' alt='Image of Moose graduating'></img>
                <PythonTutor props={{code: code}}/>
                <div style={text_style}><Reader text='Take a look at the code! What do you think will printed at the end?'/></div>
            </div>
        );
    }

    function getPage2() {
        return (
            <div style={whole_container_style}>
                <PythonTutor props={{code: code}}/>
                <div style={quarter_div_container}>
                    <div style={{...quarter_div_elements, top: "0"}}>
                        <Reader text='Press the next button until the red arrow is on line 4. What will year be reassigned to?'/>
                        <div style={horizontal_div_style}>
                            <button style={answer_button_style} type='button' onClick={() => handleQ1(false)}>{"4039"}</button>
                            <button style={answer_button_style} type='button' onClick={() => handleQ1(true)}>{"2020"}</button>
                        </div>
                        <div style={answer_explanation_style}><Reader text={q1AnswerExplanation}/></div>
                    </div>
                    <div style={{...quarter_div_elements, top: "0", right: "0"}}>
                        <Reader text="With the red arrow on line 5, what will moose_title be reassigned to?"/>
                        <div style={horizontal_div_style}>
                            <button style={answer_button_style} type='button' onClick={() => handleQ2(true)}>{"'Dr.'"}</button>
                            <button style={answer_button_style} type='button' onClick={() => handleQ2(false)}>{"'Mr.Dr.'"}</button>
                        </div>
                        <div style={answer_explanation_style}><Reader text={q2AnswerExplanation}/></div>
                    </div>
                    <div style={{...quarter_div_elements, bottom: "0"}}>
                        <Reader text='What will be printed when line 6 is executed?'/>
                        <div style={horizontal_div_style}>
                            <button style={answer_button_style} type='button' onClick={() => handleQ3(false, "2019")}>{"2019"}</button>
                            <button style={answer_button_style} type='button' onClick={() => handleQ3(false, "4039")}>{"4039"}</button>
                            <button style={answer_button_style} type='button' onClick={() => handleQ3(true)}>{"2020"}</button>
                        </div>
                        <div style={answer_explanation_style}><Reader text={q3AnswerExplanation}/></div>
                    </div>
                    <div style={{...quarter_div_elements, bottom: "0", right: "0"}}>
                        <Reader text='What will be printed when line 7 is executed?'/>
                        <div style={horizontal_div_style}>
                            <button style={answer_button_style} type='button' onClick={() => handleQ4(true)}>{"Dr."}</button>
                            <button style={answer_button_style} type='button' onClick={() => handleQ4(false, "Mr")}>{"Mr."}</button>
                            <button style={answer_button_style} type='button' onClick={() => handleQ4(false, "moose_title")}>{"moose_title"}</button>
                        </div>
                        <div style={answer_explanation_style}><Reader text={q4AnswerExplanation}/></div>
                    </div>
                </div>
            </div>
        );
    }
}

const whole_container_style = {
    display: "flex",
    flexDirection: "column" as "column",
    textAlign: "center" as "center",
    width: "100%",
    height: "100%",
    justifyContent: "space-around"
}

const horizontal_div_style = {
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: "5%",
    margin: "2%",
}

const text_style = {
    fontWeight: "600",
    fontSize: "1.5rem",
    lineHeight: "2rem",
    textAlign: "center" as "center"
}

const image_style = {
    marginLeft: "auto", 
    marginRight: "auto",
    display: "block"
}

const answer_button_style = {
    backgroundColor: "#D1D5DB",
    color: "black",
    fontSize: "1rem",
    border: "1px solid grey",
    borderRadius: "30px",
    padding: "15px 50px",
    cursor: "pointer",
    whiteSpace: "pre-wrap" as "pre-wrap"
}

const answer_explanation_style = {
    marginBottom: "1%",
    fontSize: "1rem",
}

const quarter_div_container = {
    position: "relative" as "relative",
    height: "100%",
    width: "100%",
}

const quarter_div_elements = {
    position: "absolute" as "absolute", 
    width: "50%",
    height: "50%",
    border: "3px solid #A7BB01",
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "center"
}