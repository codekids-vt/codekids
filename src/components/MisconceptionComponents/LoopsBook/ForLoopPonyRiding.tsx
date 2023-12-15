import React, { useState } from 'react';
import { Reader } from '../../Reader';
import { GetWindowScale } from '../GetWindowScale';
import Image from 'next/image'

export function ForLoopPonyRiding({setAllowNext} : {setAllowNext: React.Dispatch<React.SetStateAction<boolean>>}) {

    const windowScale = GetWindowScale()

    const [q1AnswerExplanation, setQ1AnswerExplanation] = useState("Choose an answer above!")
    const [q1Correct, setQ1Correct] = useState(false)

    React.useEffect(() => {
        setAllowNext(q1Correct)
    }, [q1Correct, setAllowNext])

    function handleQ1(correct: boolean, incorrect: string = "") {
        if(correct) {
            setQ1AnswerExplanation("Correct! range(0, 3) will give the iterable object [0, 1, 2] which will make the For-loop execute three times.")
            setQ1Correct(true)
        } else {
            switch (incorrect) {
                case "1,3":
                    setQ1AnswerExplanation("Incorrect. range(1, 3) will give the iterable object [1, 2] which means the For-loop will execute only two times. Try again!")
                    break
                case "lap_number":
                    setQ1AnswerExplanation("Incorrect. lap_number is the iterator variable. The iterator object determines how many times the loop executes. Try again!")
                    break
                case "0,5":
                    setQ1AnswerExplanation("Incorrect. range(0, 5) will give the iterable object [0, 1, 2, 3, 4] which means the For-loop will execute five times. Try again!")
                    break;
                default:
            }
        }
    }

    return(
        <div className='flex flex-col gap-10 text-center items-center' style={{zoom: windowScale}}>
            <div className='flex gap-5'>
                <Image width={500} height={500} src={"/LoopsBook/riding_3.jpg"} alt='Image of people riding pony'/>
                <Image width={500} height={500} src={"/LoopsBook/riding_2.jpg"} alt='Image of people riding pony'/>
            </div>
            <div style={text_style}>{"What would the iterator object be if a pony ride took you on three laps?"}</div>
            <div className='flex gap-10'>
                <button style={answer_button_style} type='button' onClick={() => handleQ1(false, "1,3")}>range(1, 3)</button>
                <button style={answer_button_style} type='button' onClick={() => handleQ1(false, "lap_number")}>lap_number</button>
                <button style={answer_button_style} type='button' onClick={() => handleQ1(true)}>range(0, 3)</button>
                <button style={answer_button_style} type='button' onClick={() => handleQ1(false, "0,5")}>range(0, 5)</button>
            </div>
            <Reader text={q1AnswerExplanation}/>
        </div>
    );
}

const text_style = {
    fontWeight: "600",
    fontSize: "1.5rem",
    lineHeight: "2rem",
    textAlign: "center" as "center"
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