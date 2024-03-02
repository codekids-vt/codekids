import React, { useState } from 'react';
import { Reader } from '../../Reader';
import { GetWindowScale } from '../GetWindowScale';

export function ForLoopStructure({setAllowNext} : {setAllowNext: React.Dispatch<React.SetStateAction<boolean>>}) {

    const windowScale = GetWindowScale()

    const [q1AnswerExplanation, setQ1AnswerExplanation] = useState("Choose an answer above!")
    const [q1Correct, setQ1Correct] = useState(false)

    React.useEffect(() => {
        setAllowNext(q1Correct)
    }, [q1Correct, setAllowNext])

    function handleQ1(correct: boolean, incorrect: string = "") {
        if(correct) {
            setQ1AnswerExplanation("Correct! cup_number will change for every iteration of the loop!")
            setQ1Correct(true)
        } else {
            switch (incorrect) {
                case "for":
                    setQ1AnswerExplanation("Incorrect. 'for' is the word used to indicate the beginning of a For-loop.")
                    break
                case "in":
                    setQ1AnswerExplanation("Incorrect. 'in' is the word used to tell the For-loop what the iterable object is.")
                    break
                case "range":
                    setQ1AnswerExplanation("Incorrect. range(0, 5) gives the iterable object [0, 1, 2, 3, 4].")
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
                    {"for cup_number in range(0, 5):\n\tprint(\"Fed baby goats a cup!\")"}
                </p>
            </div>
            <div className='mb-5' style={text_style}><Reader text='Which is the iterator variable in the example?'/></div>
            <div className='flex gap-10 mb-5'>
                <button style={answer_button_style} type='button' onClick={() => handleQ1(false, "for")}>for</button>
                <button style={answer_button_style} type='button' onClick={() => handleQ1(true)}>cup_number</button>
                <button style={answer_button_style} type='button' onClick={() => handleQ1(false, "in")}>in</button>
                <button style={answer_button_style} type='button' onClick={() => handleQ1(false, "range")}>range(0, 5)</button>
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
