import React, { useState } from 'react';
import { Reader } from '../../Reader';
import { GetWindowScale } from '../GetWindowScale';
import Image from 'next/image'

export function WhileLoopPonyRiding({setAllowNext} : {setAllowNext: React.Dispatch<React.SetStateAction<boolean>>}) {

    const windowScale = GetWindowScale()

    const [q1AnswerExplanation, setQ1AnswerExplanation] = useState("Choose an answer above!")
    const [q1Correct, setQ1Correct] = useState(false)

    React.useEffect(() => {
        setAllowNext(q1Correct)
    }, [q1Correct, setAllowNext])

    function handleQ1(correct: boolean, incorrect: string = "") {
        if(correct) {
            setQ1AnswerExplanation("Correct! lap_number must be changed during the loop so that lap_number is eventually three or greater.")
            setQ1Correct(true)
        } else {
            switch (incorrect) {
                case "<3":
                    setQ1AnswerExplanation("Incorrect. lap_number < 3 would be the condition. Try again!")
                    break
                case "while":
                    setQ1AnswerExplanation("Incorrect. while is the word used to indicate the beginning of a while loop. Try again!")
                    break
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
            <div style={text_style}>{"What would the update step be if each pony ride is three laps?"}</div>
            <div className='flex gap-10'>
                <button style={answer_button_style} type='button' onClick={() => handleQ1(false, "<3")}>{"lap_number < 3"}</button>
                <button style={answer_button_style} type='button' onClick={() => handleQ1(false, "while")}>while</button>
                <button style={answer_button_style} type='button' onClick={() => handleQ1(true)}>lap_number = lap_number + 1</button>
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