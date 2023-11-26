import React, { useState } from 'react';
import { Reader } from '../../Reader';
import { GetWindowScale } from '.././GetWindowScale';
import Image from 'next/image'
import { CodeStep } from './CodeStep';

export function BuyDonut({ setAllowNext }: {setAllowNext: React.Dispatch<React.SetStateAction<boolean>> }) {

    const [currentLine, setCurrentLine] = useState(0)
    const [currentImage, setCurrentImage] = useState("")
    const [showQuestion, setShowQuestion] = useState(false)
    const [enableNext, setEnableNext] = useState(true)

    const [q1AnswerExplanation, setQ1AnswerExplanation] = useState("Choose an answer above!")
    const [q1Correct, setQ1Correct] = useState(false)

    const code = "your_money = 2\ndonut_price = 2\nif donut_price <= your_money:\n\tprint(\"Yes! You can buy a donut!\")\nelse:\n\tprint(\"Sorry, you don't have enough money to buy a yummy donut.\")\n \n# End of program"

    React.useEffect(() => {
        setAllowNext(q1Correct && (currentLine === 7))
    }, [q1Correct, currentLine, setAllowNext])

    const getLine = (lineNumber: number) => {
        setCurrentLine(lineNumber)
        if(lineNumber === 0) {
            setCurrentImage("")
            setShowQuestion(false)
        } else if(lineNumber === 1) {
            setCurrentImage("/FlowchartsBook/BuyDonut/example_1_1.png")
            setShowQuestion(false)
            setEnableNext(true)
        } else if((lineNumber === 2 )|| (lineNumber === 3)) {
            setCurrentImage("/FlowchartsBook/BuyDonut/example_1_3.png")
            setShowQuestion(true)
            setEnableNext(q1Correct)
        } else if(lineNumber === 7) {
            setCurrentImage("/FlowchartsBook/example_1.png")
            setShowQuestion(false)
        }
    }

    function handleQ1(correct: boolean) {
        if(correct) {
            setQ1AnswerExplanation("Correct! You have enough money to buy a donut, so it will follow the True arrow. Press the Next button above!")
            setQ1Correct(true)
            setEnableNext(true)
        } else {
            setQ1AnswerExplanation("Incorrect. Do you have enough money to buy a donut? Follow the True or False arrow.")
        }
    }

    return(
        <React.Fragment>
            <CodeStep props={{code: code, getLine: getLine, skipLines: [4, 5, 6], enableNext: enableNext}}/>
            {currentImage !== "" && <Image className='mb-5' height={600} width={600} src={currentImage} alt='Partial image of flowchart'/>}
            {showQuestion &&
                <React.Fragment >
                    <div style={text_style}><Reader text='What will be printed based on the flowchart?'/></div>
                    <div className='inline-flex rounded-md gap-10 m-5'>
                        <button style={answer_button_style} onClick={() => handleQ1(true)}>{"print(\"Yes, you can buy a donut!\")"}</button>
                        <button style={answer_button_style} onClick={() => handleQ1(false)}>{"print(\"Sorry, you don't have enough money to buy a yummy donut.\")"}</button>
                    </div>
                    <Reader text={q1AnswerExplanation}/>
                </React.Fragment>
            }
        </React.Fragment>
    );
}

const answer_button_style = {
    backgroundColor: "#90D6AB",
    color: "black",
    fontSize: "20px",
    border: "1px solid grey",
    borderRadius: "30px",
    padding: "5px 20px",
    margin: ".5%",
    cursor: "pointer",
    whiteSpace: "pre-wrap" as "pre-wrap"
}

const text_style = {
    fontWeight: "600",
    fontSize: "1.5rem",
    lineHeight: "2rem",
    textAlign: "center" as "center"
}