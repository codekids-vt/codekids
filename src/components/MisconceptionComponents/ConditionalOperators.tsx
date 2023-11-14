import React, { useState } from 'react';
import { Reader } from '../Reader';
import { GetWindowScale } from './GetWindowScale';

export interface ICondtionalOperatorsProps {
    pageNumber: number
}

export function ConditionalOperators({ props }: { props: any | ICondtionalOperatorsProps }) {

    const windowScale = GetWindowScale()

    const [q1ChosenAnswer, setQ1ChosenAnswer] = useState("?")
    const [q1AnswerExplanation, setQ1AnswerExplanation] = useState("Choose an answer above!")
    const [q2ChosenAnswer, setQ2ChosenAnswer] = useState("?")
    const [q2AnswerExplanation, setQ2AnswerExplanation] = useState("Choose an answer above!")
    const [q3ChosenAnswer, setQ3ChosenAnswer] = useState("?")
    const [q3AnswerExplanation, setQ3AnswerExplanation] = useState("Choose an answer above!")
    const [q4ChosenAnswer, setQ4ChosenAnswer] = useState("?")
    const [q4AnswerExplanation, setQ4AnswerExplanation] = useState("Choose an answer above!")

    function handleQ1(correct: boolean, incorrect : string = "" ) {
        if(correct) {
            setQ1ChosenAnswer("False")
            setQ1AnswerExplanation("Correct! 'black' is not equal to 'cream'.")
        } else {
            switch (incorrect) {
                case "True":
                    setQ1ChosenAnswer("True")
                    setQ1AnswerExplanation("Incorrect. Are the values of derek_color and wagner_color equal? Try again!")
                    break;
                case "None":
                    setQ1ChosenAnswer("None")
                    setQ1AnswerExplanation("Incorrect. Remember the result of == is alway True or False. Try again!")
                    break;
                default:
            }
        }
    }

    function handleQ2(correct: boolean, incorrect : string = "" ) {
        if(correct) {
            setQ2ChosenAnswer("True")
            setQ2AnswerExplanation("Correct! 'cream' is equal to 'cream'!")
        } else {
            switch (incorrect) {
                case "False":
                    setQ2ChosenAnswer("False")
                    setQ2AnswerExplanation("Incorrect. Are the values of derek_color and josie_color equal? Try again!")
                    break;
                case "None":
                    setQ2ChosenAnswer("None")
                    setQ2AnswerExplanation("Incorrect. Remember the result of == is alway True or False. Try again!")
                    break;
                default:
            }

        }
    }

    function handleQ3(correct: boolean, incorrect : string = "" ) {
        if(correct) {
            setQ3ChosenAnswer("False")
            setQ3AnswerExplanation("Correct! total_number is a string while black_number and yellow_number are Integers. So it will be false.")
        } else {
            switch (incorrect) {
                case "True":
                    setQ3ChosenAnswer("True")
                    setQ3AnswerExplanation("Incorrect. Notice that total_number is a string. Try again!")
                    break;
                case "None":
                    setQ3ChosenAnswer("None")
                    setQ3AnswerExplanation("Incorrect. Remember the result of == is alway True or False. Try again!")
                    break;
                default:
            }
        }
    }

    function handleQ4(correct: boolean, incorrect : string = "" ) {
        if(correct) {
            setQ4ChosenAnswer("None")
            setQ4AnswerExplanation("Correct! This is using > one a string and integer which can't be done.")
        } else {
            switch (incorrect) {
                case "True":
                    setQ4ChosenAnswer("True")
                    setQ4AnswerExplanation("Incorrect. What are the data types of total_number and cream_number? Try again!")
                    break;
                case "False":
                    setQ4ChosenAnswer("False")
                    setQ4AnswerExplanation("Incorrect. What are the data types of total_number and cream_number? Try again!")
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
            <div style={{textAlign: "center", width: "100%", zoom: windowScale}}>
                <span style={text_style}><Reader text='Test you knowledge about conditional operators!'/></span>
                <img style={{...image_style, width: "35%", height: "auto"}} src="/IfStatementsBook/therapy_dog_1.png" alt="Image of therarpy dogs with their names." />
                <div style={code_box_style}>
                    <p style={code_style}>
                        derek_color = <span style={code_string_style}>'cream'</span><br/>
                        wagner_color = <span style={code_string_style}>'black'</span><br/>
                        derek_color == wagner_color = <span style={code_boolean_style}>{q1ChosenAnswer}</span>
                    </p>
                </div>
                <div style={horizontal_div_style}>
                    <button style={answer_button_style} type='button' onClick={() => handleQ1(false, "True")}>True</button>
                    <button style={answer_button_style} type='button' onClick={() => handleQ1(true)}>False</button>
                    <button style={answer_button_style} type='button' onClick={() => handleQ1(false, "None")}>None</button>
                </div>
                <div style={answer_explanation_style}><Reader text={q1AnswerExplanation}/></div>
                <div style={code_box_style}>
                    <p style={code_style}>
                        josie_color = <span style={code_string_style}>'cream'</span><br/>
                        derek_color == josie_color = <span style={code_boolean_style}>{q2ChosenAnswer}</span>
                    </p>
                </div>
                <div style={horizontal_div_style}>
                    <button style={answer_button_style} type='button' onClick={() => handleQ2(true)}>True</button>
                    <button style={answer_button_style} type='button' onClick={() => handleQ2(false, "False")}>False</button>
                    <button style={answer_button_style} type='button' onClick={() => handleQ2(false, "None")}>None</button>
                </div>
                <div style={answer_explanation_style}><Reader text={q2AnswerExplanation}/></div>
            </div>
        );
    }

    function getPage2() {
        return (
            <div style={{textAlign: "center", width: "100%", zoom: windowScale}}>
                <img style={{...image_style, width: "35%", height: "auto"}} src="/IfStatementsBook/therapy_dog_1.png" alt="Image of therarpy dogs with their names." />
                <div style={code_box_style}>
                    <p style={code_style}>
                        black_number = <span style={code_integer_style}>1</span><br/>
                        cream_number = <span style={code_integer_style}>2</span><br/>
                        total_number == <span style={code_string_style}>'3'</span><br/>
                        total_number == (black_number + cream_number) = <span style={code_boolean_style}>{q3ChosenAnswer}</span>
                    </p>
                </div>
                <div style={horizontal_div_style}>
                    <button style={answer_button_style} type='button' onClick={() => handleQ3(false, "True")}>True</button>
                    <button style={answer_button_style} type='button' onClick={() => handleQ3(true)}>False</button>
                    <button style={answer_button_style} type='button' onClick={() => handleQ3(false, "None")}>None</button>
                </div>
                <div style={answer_explanation_style}><Reader text={q3AnswerExplanation}/></div>
                <div style={code_box_style}>
                    <p style={code_style}>
                        total_number {">"} cream_number = <span style={code_boolean_style}>{q4ChosenAnswer}</span>
                    </p>
                </div>
                <div style={horizontal_div_style}>
                    <button style={answer_button_style} type='button' onClick={() => handleQ4(false, "True")}>True</button>
                    <button style={answer_button_style} type='button' onClick={() => handleQ4(false, "False")}>False</button>
                    <button style={answer_button_style} type='button' onClick={() => handleQ4(true)}>None</button>
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
    margin: "3%",
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
    margin: "3% auto",
    padding: "3%"
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

const answer_explanation_style = {
    marginBottom: "3%",
    fontSize: "1.2rem",
}