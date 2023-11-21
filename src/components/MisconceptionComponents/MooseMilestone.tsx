import React, { Dispatch, SetStateAction, useState } from 'react';
import { Reader } from '../Reader';
import { GetWindowScale } from './GetWindowScale';
import { PythonTutor } from '../PythonTutor';
import Image from 'next/image'

export interface IMooseMilestoneProps {
    pageNumber: number
}


const code = "moose_birth = 2012\nmilestone_year = 2019\nmoose_age = milestone_year - moose_birth\nprint(moose_age)"

export function MooseMilestone({ props, setAllowNext }: { props: any | IMooseMilestoneProps, setAllowNext: Dispatch<SetStateAction<boolean>> }) {
    const windowScale = GetWindowScale()

    
    const [q1AnswerExplanation, setQ1AnswerExplanation] = useState("Select an answer above!")
    const [q2AnswerExplanation, setQ2AnswerExplanation] = useState("Select an answer above!")
    const [q3AnswerExplanation, setQ3AnswerExplanation] = useState("Select an answer above!")
    const [q4AnswerExplanation, setQ4AnswerExplanation] = useState("Select an answer above!")

    const [q1Correct, setQ1Correct] = useState(false)
    const [q2Correct, setQ2Correct] = useState(false)
    const [q3Correct, setQ3Correct] = useState(false)
    const [q4Correct, setQ4Correct] = useState(false)

    React.useEffect(() => {
        if (props.pageNumber === 2) {
            setAllowNext(q1Correct && q2Correct && q3Correct && q4Correct)
        }
    }, [q1Correct, q2Correct, q3Correct, q4Correct])


    function handleQ1(correct: boolean, incorrect: string = "") {
        if(correct) {
            setQ1AnswerExplanation("Correct! moose_birth and milestone_year are both Integers")
            setQ1Correct(true)
        } else {
            switch (incorrect) {
                case "String":
                    setQ1AnswerExplanation("Incorrect. Remember that Strings are always surrounded by single or double quotation marks. Try again!")
                    break;
                case "Boolean":
                    setQ1AnswerExplanation("Incorrect. Remember that a Boolean can only be True or False. Try again!")
                    break;
                default:
            }
        }
    }

    function handleQ2(correct: boolean) {
        if(correct) {
            setQ2AnswerExplanation("Correct! Press the next button again to see the variable get created!")
            setQ2Correct(true)
        } else {
            setQ2AnswerExplanation("Incorrect. The program is evaluating (milestone-year - moose-birth) and setting that as the value of moose_age.")
        }
    }

    function handleQ3(correct: boolean,  incorrect: string = "") {
        if(correct) {
            setQ3AnswerExplanation("Correct! Press the next button again to see the value printed!")
            setQ3Correct(true)
        } else {
            switch (incorrect) {
                case "m-m":
                    setQ3AnswerExplanation("Incorrect. Remember moose_age is being set to what (milestone_year - moose_birth) evaluates to. Try again!")
                    break;
                case "age":
                    setQ3AnswerExplanation("Incorrect. Remember that print(moose_age) will print the value of moose_age. Try again!")
                    break;
                default:
            }
        }
    }

    function handleQ4(correct: boolean,  incorrect: string = "") {
        if(correct) {
            setQ4AnswerExplanation("Correct! print(\"moose_age\") will print the literal string \"moose_age\", not the variable!")
            setQ4Correct(true)
        } else {
            switch (incorrect) {
                case "m-m":
                    setQ4AnswerExplanation("Incorrect. Pay close attention to what's inside the final print(). Try again!")
                    break;
                case "7":
                    setQ4AnswerExplanation("Incorrect. Notice that print(\"moose_age\") is surrounded by double quotation marks. Try again!")
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
                <div style={text_style}><Reader text='Remarkable milestones for Moose!'/></div>
                <Image style={image_style} width={500} height={500} src={"/LifeOfMoose/moose_milestone.png"} alt='Image of Moose'/>
                <PythonTutor props={{code: code}}/>
                <div style={text_style}><Reader text='Take a look at the code. What do you think will be printed at the end? We will trace the code in the next page.'/></div>
            </div>
        );
    }

    function getPage2() {
        return (
            <div style={whole_container_style}>
                <PythonTutor props={{code: code}}/>
                <div style={quarter_div_container}>
                    <div style={{...quarter_div_elements, top: "0"}}>
                        <Reader text='What is the data type of the moose_birth and milestone_year variables'/>
                        <div style={horizontal_div_style}>
                            <button style={answer_button_style} type='button' onClick={() => handleQ1(false, "String")}>{"String"}</button>
                            <button style={answer_button_style} type='button' onClick={() => handleQ1(true)}>{"Integer"}</button>
                            <button style={answer_button_style} type='button' onClick={() => handleQ1(false, "Boolean")}>{"Boolean"}</button>
                        </div>
                        <div style={answer_explanation_style}><Reader text={q1AnswerExplanation}/></div>
                    </div>
                    <div style={{...quarter_div_elements, top: "0", right: "0"}}>
                        <Reader text="Press the next button twice and watch moose_birth and milestone_year be created. What will moose_age be assigned to when it's created."/>
                        <div style={horizontal_div_style}>
                            <button style={answer_button_style} type='button' onClick={() => handleQ2(false)}>{"milestone-year - moose-birth"}</button>
                            <button style={answer_button_style} type='button' onClick={() => handleQ2(true)}>{"7"}</button>
                        </div>
                        <div style={answer_explanation_style}><Reader text={q2AnswerExplanation}/></div>
                    </div>
                    <div style={{...quarter_div_elements, bottom: "0"}}>
                        <Reader text='What will be printed at the end of the program?'/>
                        <div style={horizontal_div_style}>
                            <button style={answer_button_style} type='button' onClick={() => handleQ3(false, "m-m")}>{"milestone-year - moose-birth"}</button>
                            <button style={answer_button_style} type='button' onClick={() => handleQ3(true)}>{"7"}</button>
                            <button style={answer_button_style} type='button' onClick={() => handleQ3(false, "age")}>{"moose_age"}</button>
                        </div>
                        <div style={answer_explanation_style}><Reader text={q3AnswerExplanation}/></div>
                    </div>
                    <div style={{...quarter_div_elements, bottom: "0", right: "0"}}>
                        <Reader text='What if print(moose_age) was changed to print("moose_age")? What would be printed then? You can also make the change if you press the "Edit Code" button!'/>
                        <div style={horizontal_div_style}>
                            <button style={answer_button_style} type='button' onClick={() => handleQ4(false, "m-m")}>{"milestone-year - moose-birth"}</button>
                            <button style={answer_button_style} type='button' onClick={() => handleQ4(false, "7")}>{"7"}</button>
                            <button style={answer_button_style} type='button' onClick={() => handleQ4(true)}>{"moose_age"}</button>
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
    justifyContent: "center",
    overflow: "scroll"
}