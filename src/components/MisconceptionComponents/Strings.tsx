"use client"
import React, { useState } from 'react';
import { Reader } from '../Reader';
import { GetWindowScale } from './GetWindowScale';

export interface IStringsProps {
    stringsPage: number
}

export function Strings({ props }: { props: any | IStringsProps }) {

    const windowScale = GetWindowScale()

    const [q1AnswerExplanation, setQ1AnswerExplanation] = useState("Choose an answer above!")
    const [q2AnswerExplanation, setQ2AnswerExplanation] = useState("Choose an answer above!")
    const [q3AnswerExplanation, setQ3AnswerExplanation] = useState("Choose an answer above!")
    const [q4AnswerExplanation, setQ4AnswerExplanation] = useState("Choose an answer above!")
    const [q5AnswerExplanation, setQ5AnswerExplanation] = useState("Choose an answer above!")

    function handleQ1(correct: boolean, incorrect: string = "") {
        if(correct) {
            setQ1AnswerExplanation("Correct! All the values are surrounded by single or double quotation marks. This means they are Strings!")
        } else {
            switch (incorrect) {
                case "Integer":
                    setQ1AnswerExplanation("Incorrect. Notice that all of the values are surrounded by single or double quotation marks. Also remember an integer is a whole number. Try again!")
                    break;
                case "Boolean":
                    setQ1AnswerExplanation("Incorrect. Notice that all of the values are surrounded by single or double quotation marks. Also remember a Boolean is always True or False. Try again!")
                    break;
                case "None":
                    setQ1AnswerExplanation("Incorrect. Notice that all of the values are surrounded by single or double quotation marks. Also it's impossible for a variable to not have a data type. Try again!")
                    break;
                default:
            }
        }
    }

    function handleQ2(correct: boolean, incorrect: string = "") {
        if(correct) {
            setQ2AnswerExplanation("Correct! The quotation marks are not printed when printing a String.")
        } else {
            switch (incorrect) {
                case "Derek":
                    setQ2AnswerExplanation("Incorrect. Remember the quotation marks are not printed when a String is printed. Try again!")
                    break;
                case "Epcot":
                    setQ2AnswerExplanation("Incorrect. therapy_dog_left is what's being printed. Try Again!")
                    break;
                case "Josie":
                    setQ2AnswerExplanation("Incorrect. therapy_dog_left is what's being printed. Try Again!")
                    break;
                default:
            }
        }
    }

    function handleQ3(correct: boolean, incorrect: string = "") {
        if(correct) {
            setQ3AnswerExplanation("Correct! aniversary is assigned 147 which is an integer.")
        } else {
            switch (incorrect) {
                case "Boolean":
                    setQ3AnswerExplanation("Incorrect. Remember a Boolean can only be True or False. Try again!")
                    break;
                case "String":
                    setQ3AnswerExplanation("Incorrect. Remember a string is always surrounded by single or double quotation marks. Try again!")
                    break;
                case "None":
                    setQ3AnswerExplanation("Incorrect. It's impossible for a variable to not have a data type. Try again!")
                    break;
                default:
            }
        }
    }

    function handleQ4(correct: boolean, incorrect: string = "") {
        if(correct) {
            setQ4AnswerExplanation("Correct! Even though 148 is a number, it's surrounded by double quotation marks. So, it's a String!")
        } else {
            switch (incorrect) {
                case "Boolean":
                    setQ4AnswerExplanation("Incorrect. Remember a Boolean can only be True or False. Try again!")
                    break;
                case "Integer":
                    setQ4AnswerExplanation("Incorrect. 148 is a number, however, notice that it's surrounded by double quotation marks. Try again!")
                    break;
                case "None":
                    setQ4AnswerExplanation("Incorrect. It's impossible for a variable to not have a data type. Try again!")
                    break;
                default:
            }
        }
    }

    function handleQ5(correct: boolean, incorrect: string = "") {
        if(correct) {
            setQ5AnswerExplanation("Correct! In the last print statment, it prints 'anniversary_2' which is a string. Not the variable anniversary_2")
        } else {
            switch (incorrect) {
                case "148":
                    setQ5AnswerExplanation("Incorrect. Pay close attention to what's in the final print statement. Try again!")
                    break;
                case "\"148\"":
                    setQ5AnswerExplanation("Incorrect. Pay close attention to what's in the final print statement and remember printing a string doesn't include the quotation marks. Try again!")
                    break;
            }
        }
    }

    if(props.stringsPage === 1) {
        return getPage1()
    } else if (props.stringsPage === 2) {
        return getPage2()
    }


    function getPage1()
    {
        return (
            <div style={{textAlign: "center", width: "100%", zoom: windowScale}}>
                <img style={image_style} src="/VariablesBook/therapy_dogs.png" alt="Image of Virginia Tech therapy dogs."/>
                <div style={text_style}><Reader text='What is the data type of the following?'/></div>
                <div style={code_box_style}>
                    <p style={code_style}>
                        therapy_dog_left = <span style={code_string_style}>"Derek"</span><br/>
                        therapy_dog_middle = <span style={code_string_style}>'Epcot'</span><br/>
                        therapy_dog_right = <span style={code_string_style}>"Josie"</span>
                    </p>
                </div>
                <div style={horizontal_div_style}>
                    <button style={answer_button_style} onClick={() => handleQ1(false, "Integer")}>Integer</button>
                    <button style={answer_button_style} onClick={() => handleQ1(false, "Boolean")}>Boolean</button>
                    <button style={answer_button_style} onClick={() => handleQ1(true)}>String</button>
                    <button style={answer_button_style} onClick={() => handleQ1(false, "None")}>None</button>
                </div>
                <div style={answer_explanation_style}><Reader text={q1AnswerExplanation}/></div>
                <div style={text_style}><Reader text='What is printed at the end of this program?'/></div>
                <div style={code_box_style}>
                    <p style={code_style}>
                        therapy_dog_left = <span style={code_string_style}>"Derek"</span><br/>
                        therapy_dog_middle = <span style={code_string_style}>'Epcot'</span><br/>
                        therapy_dog_right = <span style={code_string_style}>"Josie"</span><br/>
                        print(therapy_dog_left)
                    </p>
                </div>
                <div style={horizontal_div_style}>
                    <button style={answer_button_style} onClick={() => handleQ2(false, "Derek")}>"Derek"</button>
                    <button style={answer_button_style} onClick={() => handleQ2(false, "Epcot")}>Epcot</button>
                    <button style={answer_button_style} onClick={() => handleQ2(false, "Josie")}>Josie</button>
                    <button style={answer_button_style} onClick={() => handleQ2(true)}>Derek</button>
                </div>
                <div style={answer_explanation_style}><Reader text={q2AnswerExplanation}/></div>
            </div>
        );
    }

    function getPage2() {
        return (
            <div style={{textAlign: "center", width: "100%", zoom: windowScale}}>
                <div style={horizontal_div_style}>
                    <img style={image_style} src="/VariablesBook/hokie-bird-148.png" alt="Image of Hokie Bird holding 148th birthday sign." />
                    <div style={{...code_box_style, ...{transform:"scale(1.5,1.5)"}}}>
                        <p style={code_style}>
                            anniversary = <span style={code_integer_style}>147</span><br/>
                            print("A year has passed!")<br/>
                            anniversary_2 = <span style={code_string_style}>"148"</span><br/>
                            print(<span style={code_string_style}>'anniversary_2'</span>)
                        </p>
                    </div>
                </div>
                <span style={text_style}><Reader text='What is the data type of anniversary?'/></span>
                <div style={horizontal_div_style}>
                    <button style={answer_button_style} onClick={() => handleQ3(false, "Boolean")}>Boolean</button>
                    <button style={answer_button_style} onClick={() => handleQ3(false, "String")}>String</button>
                    <button style={answer_button_style} onClick={() => handleQ3(true)}>Integer</button>
                    <button style={answer_button_style} onClick={() => handleQ3(false, "None")}>None</button>
                </div>
                <div style={answer_explanation_style}><Reader text={q3AnswerExplanation}/></div>
                <div style={text_style}><Reader text="What is the data type of anniversary_2"/></div>
                <div style={horizontal_div_style}>
                    <button style={answer_button_style} onClick={() => handleQ4(false, "Boolean")}>Boolean</button>
                    <button style={answer_button_style} onClick={() => handleQ4(true)}>String</button>
                    <button style={answer_button_style} onClick={() => handleQ4(false, "Integer")}>Integer</button>
                    <button style={answer_button_style} onClick={() => handleQ4(false, "None")}>None</button>
                </div>
                <div style={answer_explanation_style}><Reader text={q4AnswerExplanation}/></div>
                <div style={text_style}><Reader text="What is printed during this program?"/></div>
                <div style={horizontal_div_style}>
                    <button style={answer_button_style} onClick={() => handleQ5(false, "148")}>{"A year has passed!\n148"}</button>
                    <button style={answer_button_style} onClick={() => handleQ5(true)}>{"A year has passed!\nanniversary_2"}</button>
                    <button style={answer_button_style} onClick={() => handleQ5(false, "\"148\"")}>{"A year has passed!\n\"148\""}</button>
                </div>
                <div style={answer_explanation_style}><Reader text={q5AnswerExplanation}/></div>
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
    margin: "1% 0",
    height: "fit-content"
}

const code_string_style = {
    color: "#b87554"
}

const code_integer_style = {
    color: "#ff6371"
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