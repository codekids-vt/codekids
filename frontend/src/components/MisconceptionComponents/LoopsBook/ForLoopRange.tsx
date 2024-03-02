import React, { useState } from 'react';
import { Reader } from '../../Reader';
import { GetWindowScale } from '../GetWindowScale';

export function ForLoopRange({setAllowNext} : {setAllowNext: React.Dispatch<React.SetStateAction<boolean>>}) {

    const windowScale = GetWindowScale()

    const [q1AnswerExplanation, setQ1AnswerExplanation] = useState("Choose and answer above!")
    const [q1Correct, setQ1Correct] = useState(false)

    React.useEffect(() => {
        setAllowNext(q1Correct)
    }, [q1Correct, setAllowNext])

    function handleQ1(correct: boolean, incorrect: string = "") {
        if(correct) {
            setQ1AnswerExplanation("Correct! range(2, 6) will give the list 2 3 4 5.")
            setQ1Correct(true)
        } else {
            switch (incorrect) {
                case "Inclusive":
                    setQ1AnswerExplanation("Incorrect. Remember that range(2, 6) would not include 6. Try again!")
                    break
                case "0":
                    setQ1AnswerExplanation("Incorrect. Remember range() will give a list of numbers between the two numbers it's given. Try again!")
                    break
                default:
            }
        }
    }

    return(
        <div className='flex flex-col gap-5 items-center' style={{zoom: windowScale}}>
            <img width={800} height={800} src={"/LoopsBook/BabyGoats/for_loop_baby_goats.svg"} alt='Baby goat for loop'/>
            <div className='mb-5' style={text_style}><Reader text='What would be the list of numbers for range(2, 6)'/></div>
            <div className='flex gap-10 justify-center mb-5'>
                <button style={answer_button_style} type='button' onClick={() => handleQ1(false, "Inclusive")}>{"2 3 4 5 6"}</button>
                <button style={answer_button_style} type='button' onClick={() => handleQ1(true)}>{"2 3 4 5"}</button>
                <button style={answer_button_style} type='button' onClick={() => handleQ1(false, "0")}>{"0 1 2 3 4 5"}</button>
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
    cursor: "pointer"
}