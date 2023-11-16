import React, { useState } from 'react';
import { Reader } from '../Reader';
import { GetWindowScale } from './GetWindowScale';
import { PythonTutor } from '../PythonTutor';

export interface IMooseChallengingYearProps {
    pageNumber: number
}

const code = "moose_birth = 2012\npassed_away = 2020\nmoose_age = passed_away - moose_birth\nprint(moose_age)\nmoose_started = 2014\nyears_worked = passed_away - moose_started\nprint(years_worked)"

export function MooseChallengingYear({ props }: { props: any | IMooseChallengingYearProps }) {

    const windowScale = GetWindowScale()

    const [q1AnswerExplanation, setQ1AnswerExplanation] = useState("Select an answer above!")
    const [q2AnswerExplanation, setQ2AnswerExplanation] = useState("Select an answer above!")
    const [q3AnswerExplanation, setQ3AnswerExplanation] = useState("Select an answer above!")
    const [q4AnswerExplanation, setQ4AnswerExplanation] = useState("Select an answer above!")

    function handleQ1(correct: boolean) {
        if(correct) {
            setQ1AnswerExplanation("Correct! moose_age is assigned to (passed_away - moose_birth). Click the next button.")
        } else {
            setQ1AnswerExplanation("Incorrect. moose_age will be assigned to what (passed_away - moose_birth) evaluates to. Click next to see this!")
        }
    }

    function handleQ2(correct: boolean) {
        if(correct) {
            setQ2AnswerExplanation("Correct. Moose was 8 years old when he passed away.")
        } else {
            setQ2AnswerExplanation("Incorrect. moose_age will be assigned to what (passed_away - moose_birth) evaluates to.")
        }
    }

    function handleQ3(correct: boolean) {
        if(correct) {
            setQ3AnswerExplanation("Correct. years_worked is assigned to (passed_away - moose_started). Click the next button.")
        } else {
            setQ3AnswerExplanation("Incorrect. years_worked will be assigned to what (passed_away - moose_started) evaluates to.")
        }
    }

    function handleQ4(correct: boolean) {
        if(correct) {
            setQ4AnswerExplanation("Correct. Moose worked as a therapy dog for 6 years.")
        } else {
            setQ4AnswerExplanation("Incorrect. Remember print() will print the value of a variable.")
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
                <div style={text_style}><Reader text='A challenging year for Moose.'/></div>
                <img style={image_style} src='/LifeOfMoose/moose_with_hokie_bird.png' alt='Image of Moose graduating'></img>
                <PythonTutor props={{code: code}}/>
                <div style={text_style}><Reader text='Take a look at the code! What do you think will printed throughout the program?'/></div>
            </div>
        );
    }

    function getPage2() {
        return (
            <div style={whole_container_style}>
                <PythonTutor props={{code: code}}/>
                <div style={quarter_div_container}>
                    <div style={{...quarter_div_elements, top: "0"}}>
                        <Reader text='Click the next button twice until the red arrow is on line 3. What will moose_age be assigned to?'/>
                        <div style={horizontal_div_style}>
                            <button style={answer_button_style} type='button' onClick={() => handleQ1(true)}>{"8"}</button>
                            <button style={answer_button_style} type='button' onClick={() => handleQ1(false)}>{"passed_away - moose_birth"}</button>
                        </div>
                        <div style={answer_explanation_style}><Reader text={q1AnswerExplanation}/></div>
                    </div>
                    <div style={{...quarter_div_elements, top: "0", right: "0"}}>
                        <Reader text="What will be printed when line 4 is executed?"/>
                        <div style={horizontal_div_style}>
                            <button style={answer_button_style} type='button' onClick={() => handleQ2(true)}>{"8"}</button>
                            <button style={answer_button_style} type='button' onClick={() => handleQ2(false)}>{"passed_away - moose_birth"}</button>
                        </div>
                        <div style={answer_explanation_style}><Reader text={q2AnswerExplanation}/></div>
                    </div>
                    <div style={{...quarter_div_elements, bottom: "0"}}>
                        <Reader text='Click next until the red arrow is on line 6. What will years_worked be evaluated to?'/>
                        <div style={horizontal_div_style}>
                            <button style={answer_button_style} type='button' onClick={() => handleQ3(false)}>{"8"}</button>
                            <button style={answer_button_style} type='button' onClick={() => handleQ3(true)}>{"6"}</button>
                        </div>
                        <div style={answer_explanation_style}><Reader text={q3AnswerExplanation}/></div>
                    </div>
                    <div style={{...quarter_div_elements, bottom: "0", right: "0"}}>
                        <Reader text='What will be printed when line 7 is executed?'/>
                        <div style={horizontal_div_style}>
                            <button style={answer_button_style} type='button' onClick={() => handleQ4(false)}>{"years_worked"}</button>
                            <button style={answer_button_style} type='button' onClick={() => handleQ4(true)}>{"6"}</button>
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