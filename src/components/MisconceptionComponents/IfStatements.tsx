import React, { useState } from 'react';
import { Reader } from '../Reader';
import { GetWindowScale } from './GetWindowScale';
import Image from 'next/image'

export interface IIfStatementsProps {
    pageNumber: number
}

export function IfStatements({ props }: { props: any | IIfStatementsProps }) {

    const windowScale = GetWindowScale()

    const [q1AnswerExplanation, setQ1AnswerExplanation] = useState("Choose an answer above!")
    const [q2AnswerExplanation, setQ2AnswerExplanation] = useState("Choose an answer above!")
    const [q3AnswerExplanation, setQ3AnswerExplanation] = useState("Choose an answer above!")
    const [q4AnswerExplanation, setQ4AnswerExplanation] = useState("Choose an answer above!")

    function handleQ1(correct: boolean, incorrect : string = "" ) {
        if(correct) {
            setQ1AnswerExplanation("Correct! derek_is_happy is True so everything indented under the If-statement will be executed"
                                    + "and the else will be skipped.")
        } else {
            switch (incorrect) {
                case "TF":
                    setQ1AnswerExplanation("Incorrect. Remember that the else isn't executed when the If-statement is True. Try again!")
                    break;
                case "False":
                    setQ1AnswerExplanation("Incorrect. When the condition for the If-Statement is True, everything indented under the If-"
                    + "statement will be executed. Try again!")
                    break;
                case "N":
                    setQ1AnswerExplanation("Incorrect. If the condition of the If-statement is True, everything indented under the If-statement"
                                            + " will be executed. If the condition is false, the else will be executed. Try again!")
                    break;
                default:
            }
        }
    }

    function handleQ2(correct: boolean, incorrect : string = "" ) {
        if(correct) {
            setQ2AnswerExplanation("Correct! The If-statement will execute. Also, the final print is not part of either the if-statement or else, so it is also printed.")
        } else {
            switch (incorrect) {
                case "1":
                    setQ2AnswerExplanation("Incorrect. Is the condition in the If-statement True? Try again!")
                    break;
                case "2":
                    setQ2AnswerExplanation("Incorrect. Pay attention to the final print. Is it part of either the If-statement or else? Try again!")
                    break;
                case "3":
                    setQ2AnswerExplanation("Incorrect. Is the condition in the If-statement True? Also is the final print part of the If-statement or else? Try again!")
            }
        }
    }

    function handleQ3(correct: boolean, incorrect : string = "" ) {
        if(correct) {
            setQ3AnswerExplanation("Correct! The condition in the If-statement is false, so the If-statement will be skipped and the program will continue and print \"False\".")
        } else {
            switch (incorrect) {
                case "TF":
                    setQ3AnswerExplanation("Incorrect. Is the condition in the If-statement true? Try again!")
                    break;
                case "True":
                    setQ3AnswerExplanation("Incorrect. Is the condition in the If-statement true? Also the program will continue to execute after an If-statement. Try again!")
                    break;
                case "N":
                    setQ3AnswerExplanation("Incorrect. A program will continue to execute even if a If-statement's condition is False." 
                                            + " Also, the final print is not indented, so it's not part of the If-statement. Try again!")
                    break;
            }
        }
    }

    function handleQ4(correct: boolean, incorrect : string = "" ) {
        if(correct) {
            setQ4AnswerExplanation("Correct! hokie_bird_is_happy is True so the If-statement will pass since the OR logical operator was used.")
        } else {
            switch (incorrect) {
                case "1":
                    setQ4AnswerExplanation("Incorrect. Notice the OR logical operator is being used in the If-Statement. So, if either of the conditions are True the whole statement is True. Try again!")
                    break;
                case "2":
                    setQ4AnswerExplanation("Incorrect. Remember that the program continues to execute after an If-statement. Try again!")
                    break;
                case "3":
                    setQ4AnswerExplanation("Incorrect. Notice the OR logical operator is being used in the If-statement. Also the final print is not part of the If-statement. Try again!")
                    break;
                default:
            }
        }
    }

    if(props.pageNumber === 1) {
        return getPage1()
    } else if (props.pageNumber === 2) {
        return getPage2()
    } else if (props.pageNumber === 3) {
        return getPage3()
    }

    function getPage1() {
        return (
            <div style={{textAlign: "center", width: "100%", zoom: windowScale}}>
                <Image style={image_style} width={700} height={700} src={"/IfStatementsBook/derek_happy.png"} alt='Image of Derek the therapy dog.'/>
                <div style={text_style}><Reader text='What is printed in the program?'/></div>
                <div style={code_box_style}>
                    <p style={code_style}>
                        derek_is_happy = <span style={code_boolean_style}>True</span><br/>
                        if derek_is_happy:<br/>
                        <span style={{backgroundColor: "yellow", opacity: "0.6"}}>{"\t"}</span>print(<span style={code_string_style}>{'"True"'}</span>)<br/>
                        else:<br/>
                        <span style={{backgroundColor: "yellow", opacity: "0.6"}}>{"\t"}</span>print(<span style={code_string_style}>{'"False"'}</span>)
                    </p>
                </div>
                <div style={text_style}><Reader text='Notice that only the print("True") is part of the If-statement. The print("False") is part of the else.'/></div>
                <div style={horizontal_div_style}>
                    <button style={answer_button_style} type='button' onClick={() => handleQ1(false, "TF")}>{"True\nFalse"}</button>
                    <button style={answer_button_style} type='button' onClick={() => handleQ1(true)}>True</button>
                    <button style={answer_button_style} type='button' onClick={() => handleQ1(false, "False")}>False</button>
                    <button style={answer_button_style} type='button' onClick={() => handleQ1(false, "N")}>{"Nothing will\nbe printed."}</button>
                </div>
                <div style={answer_explanation_style}><Reader text={q1AnswerExplanation}/></div>
            </div>
        );
    }

    function getPage2() {
        return (
            <div style={{textAlign: "center", width: "100%", zoom: windowScale}}>
                <Image style={image_style} width={600} height={600} src={"/IfStatementsBook/bad_weather.png"} alt='Image of storm over Lane Stadium.'/>
                <div style={text_style}><Reader text='What is printed in the program?'/></div>
                <div style={code_box_style}>
                    <p style={code_style}>
                        the_weather_is_bad = <span style={code_boolean_style}>True</span><br/>
                        if the_weather_is_bad:<br/>
                        <span style={{backgroundColor: "yellow", opacity: "0.6"}}>{"\t"}</span>print(<span style={code_string_style}>{'"Gosh, it looks like a rainstorm!"'}</span>)<br/>
                        <span style={{backgroundColor: "yellow", opacity: "0.6"}}>{"\t"}</span>print(<span style={code_string_style}>{'"We have to cancel the game."'}</span>)<br/>
                        else:<br/>
                        <span style={{backgroundColor: "yellow", opacity: "0.6"}}>{"\t"}</span>print(<span style={code_string_style}>{'"Wow, it\'s a beautiful day!"'}</span>)<br/>
                        <span style={{backgroundColor: "yellow", opacity: "0.6"}}>{"\t"}</span>print(<span style={code_string_style}>{'"Let\'s enjoy the rest of the game!"'}</span>)<br/><br/>
                        print(<span style={code_string_style}>{'"Hopefully it\'s sunny tomorrow!"'}</span>)
                    </p>
                </div>
                <div style={horizontal_div_style}>
                    <button style={answer_button_style} type='button' onClick={() => handleQ2(false, "1")}>
                        {"Wow, it's a beautiful day!\nLet's enjoy the rest of the game!\nHopefully it's sunny tomorrow!"}
                    </button>
                    <button style={answer_button_style} type='button' onClick={() => handleQ2(true)}>
                        {"Gosh, it looks like a rainstorm!\nWe have to cancel the game.\nHopefully it's sunny tomorrow!"}
                    </button>
                </div>
                <div style={horizontal_div_style}>
                    <button style={answer_button_style} type='button' onClick={() => handleQ2(false, "2")}>
                        {"Gosh, it looks like a rainstorm!\nWe have to cancel the game.\n"}
                    </button>
                    <button style={answer_button_style} type='button' onClick={() => handleQ2(false, "3")}>
                        {"Wow, it's a beautiful day!\nLet's enjoy the rest of the game!"}
                    </button>
                </div>
                <div style={answer_explanation_style}><Reader text={q2AnswerExplanation}/></div>
            </div>
        );
    }

    function getPage3() {
        return (
            <div style={{textAlign: "center", width: "100%", zoom: windowScale}}>
                <Image style={image_style} width={250} height={250} src={"/VariablesBook/hokie-bird-148.png"} alt='Image of storm over Lane Stadium.'/>
                <div style={text_style}><Reader text='What is printed in the programs below?'/></div>
                <div style={code_box_style}>
                    <p style={code_style}>
                        anniversary = <span style={code_integer_style}>148</span><br/>
                        if anniversary == <span style={code_integer_style}>200</span>:<br/>
                        {"\t"}print(<span style={code_string_style}>{'"True"'}</span>)<br/><br/>
                        print(<span style={code_string_style}>{'"False"'}</span>)
                    </p>
                </div>
                <div style={horizontal_div_style}>
                    <button style={answer_button_style} type='button' onClick={() => handleQ3(false, "TF")}>{"True\nFalse"}</button>
                    <button style={answer_button_style} type='button' onClick={() => handleQ3(false, "True")}>True</button>
                    <button style={answer_button_style} type='button' onClick={() => handleQ3(true)}>False</button>
                    <button style={answer_button_style} type='button' onClick={() => handleQ3(false, "N")}>{"Nothing will\nbe printed."}</button>
                </div>
                <div style={answer_explanation_style}><Reader text={q3AnswerExplanation}/></div>
                <div style={code_box_style}>
                    <p style={code_style}>
                        anniversary = <span style={code_integer_style}>148</span><br/>
                        hokie_bird_is_happy = <span style={code_boolean_style}>True</span><br/>
                        if anniversary == <span style={code_integer_style}>200</span>
                        <span style={code_logical_operator_style}> or </span>hokie_bird_is_happy:<br/>
                        {"\t"}print(<span style={code_string_style}>{'"The Hokie Bird is happy!"'}</span>)<br/><br/>
                        print(<span style={code_string_style}>{'"Let\'s celebrate!"'}</span>)
                    </p>
                </div>
                <div style={horizontal_div_style}>
                    <button style={answer_button_style} type='button' onClick={() => handleQ4(false, "1")}>{"Let's celebrate!"}</button>
                    <button style={answer_button_style} type='button' onClick={() => handleQ4(false, "2")}>{"The Hokie Bird is happy!"}</button>
                </div>
                <div style={horizontal_div_style}>
                    <button style={answer_button_style} type='button' onClick={() => handleQ4(true)}>{"The Hokie Bird is happy!\nLet's celebrate!"}</button>
                    <button style={answer_button_style} type='button' onClick={() => handleQ4(false, "3")}>{"Nothing will\nbe printed."}</button>
                </div>
                <div style={answer_explanation_style}><Reader text={q4AnswerExplanation}/></div>
            </div>
        );
    }
    
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

const code_string_style = {
    color: "#b87554"
}

const code_boolean_style = {
    color: "#669955"
}

const code_logical_operator_style = {
    color: "#00a635"
}

const code_integer_style = {
    color: "#ff6371"
}

const code_style = {
    fontWeight: "400",
    fontSize: "1rem",
    width: "fit-content",
    whiteSpace: "pre-wrap" as "pre-wrap"
}

const image_style = {
    marginLeft: "auto", 
    marginRight: "auto",
    display: "block"
}

const code_box_style = {
    textAlign: "left" as "left", 
    backgroundColor: "#E8E8E8",
    width: "fit-content",
    margin: "1% auto",
    padding: "1% 3%"
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

const answer_explanation_style = {
    marginBottom: "3%",
    fontSize: "1.2rem",
}