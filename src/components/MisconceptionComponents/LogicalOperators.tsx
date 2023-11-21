import React, { useState } from 'react';
import { Reader } from '../Reader';
import { GetWindowScale } from './GetWindowScale';
import Image from 'next/image'

export function LogicalOperators({ props, setAllowNext }: { props: any, setAllowNext: React.Dispatch<React.SetStateAction<boolean>> }) {

    const windowScale = GetWindowScale()

    const [q1ChosenAnswer, setQ1ChosenAnswer] = useState("?")
    const [q1AnswerExplanation, setQ1AnswerExplanation] = useState("Choose an answer above!")
    const [q2ChosenAnswer, setQ2ChosenAnswer] = useState("?")
    const [q2AnswerExplanation, setQ2AnswerExplanation] = useState("Choose an answer above!")
    const [q3ChosenAnswer, setQ3ChosenAnswer] = useState("?")
    const [q3AnswerExplanation, setQ3AnswerExplanation] = useState("Choose an answer above!")

    const [q1Correct, setQ1Correct] = useState(false)
    const [q2Correct, setQ2Correct] = useState(false)
    const [q3Correct, setQ3Correct] = useState(false)

    React.useEffect(() => {
        if (props.pageNumber === 2) {
            setAllowNext(q1Correct)
        } else if (props.pageNumber === 3) {
            setAllowNext(q2Correct)
        } else if (props.pageNumber === 4) {
            setAllowNext(q3Correct)
        }
    }, [q1Correct, q2Correct, q3Correct])


    function handleQ1(correct: boolean, incorrect : string = "" ) {
        if(correct) {
            setQ1ChosenAnswer("True")
            setQ1AnswerExplanation("Correct! derek_color is equal to cream and josie_color is equal to cream.")
            setQ1Correct(true)
        } else {
            setQ1ChosenAnswer("False")
            setQ1AnswerExplanation("Incorrect. Is derek_color equal to cream and josie_color equal to cream? Try again!")
        }
    }

    function handleQ2(correct: boolean, incorrect : string = "" ) {
        if(correct) {
            setQ2ChosenAnswer("True")
            setQ2AnswerExplanation("Correct! Because derek_color is equal to cream, it doesn't matter that wagner_color is not equal to cream. OR only cares that one of them is True.")
            setQ2Correct(true)
        } else {
            setQ2ChosenAnswer("False")
            setQ2AnswerExplanation("Incorrect. Remember OR gives True as long as at least one of the Booleans is True. Are either of the Booleans true? Try again!")
        }
    }

    function handleQ3(correct: boolean, incorrect : string = "" ) {
        if(correct) {
            setQ3ChosenAnswer("False")
            setQ3AnswerExplanation("Correct! derek_color is equal to 'cream', which means derek_color == 'cream' is True, so the NOT of that is False")
            setQ3Correct(true)
        } else {
            setQ3ChosenAnswer("True")
            setQ3AnswerExplanation("Incorrect. derek_color is equal to 'cream', which means derek_color == 'cream' is True, but we want to get the NOT of that. Try again!")
        }
    }
    
    if(props.pageNumber === 1) {
        return getPage1()
    } else if (props.pageNumber === 2) {
        return getPage2()
    } else if (props.pageNumber === 3) {
        return getPage3()
    } else if (props.pageNumber === 4) {
        return getPage4()
    }

    function codeSnippet() {
        return (
            <div style={horizontal_div_style}>
                <Image style={image_style} width={450} height={450} src='/IfStatementsBook/therapy_dog_1.png' alt="Image of therapy dogs with their names."/>
                <div>
                    <span style={text_style}><Reader text='Use the code snippet below to answer the question.'/></span>
                    <div style={{...code_box_style, transform: "scale(1.3)"}}>
                        <p style={code_style}>
                            derek_color = <span style={code_string_style}>{"'cream'"}</span><br/>
                            wagner_color = <span style={code_string_style}>{"'black'"}</span><br/>
                            josie_color = <span style={code_string_style}>{"'cream'"}</span> 
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    function getPage1() {
        return (
            <div style={{textAlign: "center", width: "100%", height: "100%", zoom: windowScale}}>
                {codeSnippet()}
                <div style={text_style}><Reader text='The next few pages will have questions about the code above and logical operators.'/></div>
            </div>
        );
    }

    function getPage2() {
        return(
            <div style={{textAlign: "center", width: "100%", height: "100%", zoom: windowScale}}>
                {codeSnippet()}                    
                <div style={answer_explanation_style}><Reader text='AND Operator'/></div>
                    <div style={answer_explanation_style}><Reader text='Simply ask "are both of these true?"'/></div>
                    <div style={{...code_style, width: "100%"}}>(derek_color == <span style={code_string_style}>{"'cream'"}</span>) <span style={code_logical_operator_style}>and</span> (josie_color == <span style={code_string_style}>{"'cream'"}</span>) = <span style={code_boolean_style}>{q1ChosenAnswer}</span></div>
                    <div style={horizontal_div_style}>
                        <button style={answer_button_style} type='button' onClick={() => handleQ1(true)}>True</button>
                        <button style={answer_button_style} type='button' onClick={() => handleQ1(false, "False")}>False</button>
                    </div>
                <div style={answer_explanation_style}><Reader text={q1AnswerExplanation}/></div>
            </div>
        );
    }

    function getPage3() {
        return(
            <div style={{textAlign: "center", width: "100%", height: "100%", zoom: windowScale}}>
                {codeSnippet()}
                <div style={answer_explanation_style}><Reader text='OR Operator'/></div>
                    <div style={answer_explanation_style}><Reader text='Simply ask "are either of these true?"'/></div>
                    <div style={{...code_style, width: "100%"}}>(derek_color == <span style={code_string_style}>{"'cream'"}</span>) <span style={code_logical_operator_style}>or</span> (wagner_color == <span style={code_string_style}>{"'cream'"}</span>) = <span style={code_boolean_style}>{q2ChosenAnswer}</span></div>
                    <div style={horizontal_div_style}>
                        <button style={answer_button_style} type='button' onClick={() => handleQ2(true)}>True</button>
                        <button style={answer_button_style} type='button' onClick={() => handleQ2(false, "False")}>False</button>
                    </div>
                <div style={answer_explanation_style}><Reader text={q2AnswerExplanation}/></div>
            </div>
        );
    }

    function getPage4() {
        return(
            <div style={{textAlign: "center", width: "100%", height: "100%", zoom: windowScale}}>
                {codeSnippet()}
                <div style={answer_explanation_style}><Reader text='NOT Operator'/></div>
                    <div style={answer_explanation_style}><Reader text='Simply ask "what is the opposite?"'/></div>
                    <div style={{...code_style, width: "100%"}}> <span style={code_logical_operator_style}>not</span>(derek_color == <span style={code_string_style}>{"'cream'"}</span>) = <span style={code_boolean_style}>{q3ChosenAnswer}</span></div>
                    <div style={horizontal_div_style}>
                        <button style={answer_button_style} type='button' onClick={() => handleQ3(false, "True")}>True</button>
                        <button style={answer_button_style} type='button' onClick={() => handleQ3(true)}>False</button>
                    </div>
                    <div style={answer_explanation_style}><Reader text={q3AnswerExplanation}/></div>
            </div>
        );   
    }
    
}

const quarter_div_container = {
    position: "relative" as "relative",
    height: "60vh",
    width: "100%",
}

const quarter_div_elements = {
    position: "absolute" as "absolute", 
    width: "50%",
    height: "50%",
    border: "2px solid gray",
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "center"
}

const horizontal_div_style = {
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: "5%",
    margin: "1%",
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
    marginBottom: "1%",
    fontSize: "1.2rem",
}