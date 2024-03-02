import React, { useState } from 'react';
import { Reader } from '../../Reader';
import { GetWindowScale } from '../GetWindowScale';

export function WhileLoopStructure({setAllowNext} : {setAllowNext: React.Dispatch<React.SetStateAction<boolean>>}) {

    const windowScale = GetWindowScale()

    const [q1AnswerExplanation, setQ1AnswerExplanation] = useState("Choose an answer above!")
    const [q1Correct, setQ1Correct] = useState(false)

    React.useEffect(() => {
        setAllowNext(q1Correct)
    }, [q1Correct, setAllowNext])

    function handleQ1(correct: boolean, incorrect: string = "") {
        if(correct) {
            setQ1AnswerExplanation("Correct! The loop will execute so long as cup_number is less than 5!")
            setQ1Correct(true)
        } else {
            switch (incorrect) {
                case "while":
                    setQ1AnswerExplanation("Incorrect. 'while' is the word used to indicate the beginning of a while loop.")
                    break
                case "+1":
                    setQ1AnswerExplanation("Incorrect. That is the update step where we are insuring cup_number eventually becomes 5 or greater.")
                    break
                default:
            }
        }
    }

    return(
        <div className='flex flex-col gap-5 text-center items-center' style={{zoom: windowScale}}>
            <img width={500} height={500} src={"/LoopsBook/baby_goats.jpg"} alt='Image of baby goats'/>
            <div style={code_box_style}>
                <p style={code_style}>
                    {"cup_number = 0\nwhile cup_number < 5:\n\tprint(\"Fed baby goats a cup!\")\n\tcup_number = cup_number + 1"}
                </p>
            </div>
            <div className='mb-5' style={text_style}><Reader text='What is the condition in the while loop above?'/></div>
            <div className='flex gap-10 mb-5'>
                <button style={answer_button_style} type='button' onClick={() => handleQ1(false, "while")}>while</button>
                <button style={answer_button_style} type='button' onClick={() => handleQ1(true)}>{"cup_number < 5"}</button>
                <button style={answer_button_style} type='button' onClick={() => handleQ1(false, "+1")}>cup_number = cup_number + 1</button>
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

const code_box_style = {
    textAlign: "left" as "left", 
    backgroundColor: "#E8E8E8",
    width: "fit-content",
    margin: "1% auto",
    padding: "1% 3%"
}

const code_style = {
    fontWeight: "400",
    fontSize: "1.5rem",
    width: "fit-content",
    whiteSpace: "pre-wrap" as "pre-wrap"
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
