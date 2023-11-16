import React, { useRef, useState } from 'react'
import { Reader } from '../Reader';
import { GetWindowScale } from './GetWindowScale'
import { PythonTutor } from '../PythonTutor'
import Image from 'next/image'

export interface ILifeOfMooseProps {
    pageNumber: number
}


const code = "moose_name = 'Moose'\nprint(moose_name)\nmoose_birthday = '02/13/2012'\nprint(moose_birthday)\nmoose_color = 'cream'\nprint(moose_color)\n"
                + "moose_breed = 'Labrador Retriever'\nprint(moose_breed)"


export function LifeOfMoose({ props }: { props: any | ILifeOfMooseProps }) {

    const windowScale = GetWindowScale()

    const [q1AnswerExplanation, setQ1AnswerExplanation] = useState("Select an answer above!")
    const [q2AnswerExplanation, setQ2AnswerExplanation] = useState("Select an answer above!")
    const [q3AnswerExplanation, setQ3AnswerExplanation] = useState("Select an answer above!")
    const [q4AnswerExplanation, setQ4AnswerExplanation] = useState("Select an answer above!")

    function handleQ1(correct: boolean) {
        if(correct) {
            setQ1AnswerExplanation("Correct! Press the next button again to see the value printed!")
        } else {
            setQ1AnswerExplanation("Incorrect. Remember that moose_name is variable which has a value. print() will print out that value.")
        }
    }

    function handleQ2(correct: boolean) {
        if(correct) {
            setQ2AnswerExplanation("Correct! Press the next button again to see the value printed!")
        } else {
            setQ2AnswerExplanation("Incorrect. Notice the variable being printed next is moose_birthday.")
        }
    }

    function handleQ3(correct: boolean) {
        if(correct) {
            setQ3AnswerExplanation("Correct! Press the next button again to see the value printed!")
        } else {
            setQ3AnswerExplanation("Incorrect. Remember the quotation marks aren't included when printing a String")
        }
    }

    function handleQ4(correct: boolean) {
        if(correct) {
            setQ4AnswerExplanation("Correct! Press the next button again to see the value printed!")
        } else {
            setQ4AnswerExplanation("Incorrect. Remember that moose_breed is variable which has a value. print() will print out that value.")
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
                <Image style={image_style} width={600} height={600} src={"/LifeOfMoose/moose_2.png"} alt='Image of Moose'/>
                <PythonTutor props={{code: code}}/>
                <span style={text_style}><Reader text='First look over the code and then answer the following questions!'/></span>
            </div>
        );
    }

    function getPage2() {
        return (
            <div style={whole_container_style}>
                <PythonTutor props={{code: code}}/>
                <div style={quarter_div_container}>
                    <div style={{...quarter_div_elements, top: "0"}}>
                        <Reader text='Press the next button once and notice moose_name is created an contains the value "Moose". What will be printed?'/>
                        <div style={horizontal_div_style}>
                            <button style={answer_button_style} type='button' onClick={() => handleQ1(true)}>{"Moose"}</button>
                            <button style={answer_button_style} type='button' onClick={() => handleQ1(false)}>{"moose_name"}</button>
                        </div>
                        <div style={answer_explanation_style}><Reader text={q1AnswerExplanation}/></div>
                    </div>
                    <div style={{...quarter_div_elements, top: "0", right: "0"}}>
                        <Reader text='Press the next button again and notice moose_birthday is created an contains the value "02/13/2012". What will be printed'/>
                        <div style={horizontal_div_style}>
                            <button style={answer_button_style} type='button' onClick={() => handleQ2(true)}>{"02-13-2012"}</button>
                            <button style={answer_button_style} type='button' onClick={() => handleQ2(false)}>{"Moose"}</button>
                        </div>
                        <div style={answer_explanation_style}><Reader text={q2AnswerExplanation}/></div>
                    </div>
                    <div style={{...quarter_div_elements, bottom: "0"}}>
                        <Reader text='Press the next button again and notice moose_color is created an contains the value "cream". What will be printed?'/>
                        <div style={horizontal_div_style}>
                            <button style={answer_button_style} type='button' onClick={() => handleQ3(false)}>{"'cream'"}</button>
                            <button style={answer_button_style} type='button' onClick={() => handleQ3(true)}>{"cream"}</button>
                        </div>
                        <div style={answer_explanation_style}><Reader text={q3AnswerExplanation}/></div>
                    </div>
                    <div style={{...quarter_div_elements, bottom: "0", right: "0"}}>
                        <Reader text='Press the next button again and notice moose_breed is created an contains the value "Labrador Retriever" What will be printed?'/>
                        <div style={horizontal_div_style}>
                            <button style={answer_button_style} type='button' onClick={() => handleQ4(true)}>{"Labrador Retriever"}</button>
                            <button style={answer_button_style} type='button' onClick={() => handleQ4(false)}>{"moose_breed"}</button>
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
    fontSize: "1rem",
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

