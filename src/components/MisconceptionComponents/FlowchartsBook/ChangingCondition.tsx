import React, { useState } from 'react';
import { Reader } from '../../Reader';
import Image from 'next/image'
import { CodeStep } from './CodeStep';
import { GetWindowScale } from '../GetWindowScale';

export interface IChangingConditionProps {
    pageNumber: number
}

export function ChangingCondition({ props, setAllowNext }: { props: any | IChangingConditionProps, setAllowNext: React.Dispatch<React.SetStateAction<boolean>> }) {
    
    const windowScale = GetWindowScale()

    const [currentImage, setCurrentImage] = useState("")
    const [imageDim, setImageDim] = useState([600, 600])
    
    const [q1AnswerExplanation, setQ1AnswerExplanation] = useState("Choose an answer above!")
    const [q1Correct, setQ1Correct] = useState(false)

    const [p3Text, setP3Text] = useState("")
    const [currentLineNumber, setLineNumber] = useState(0)

    const code = "your_money = 16\npepperoni_price = 11\ncake_price = 3\ndonut_price = 2\nif pepperoni_price <= your_money:\n\t" +
                "print(\"Yes, you have enough money to buy a pepperoni pizza!\")\n\trest_money = your_money - pepperoni_price\n\t" +
                "if cake_price + donut_price <= rest_money:\n\t\tprint(\"Yes, you have enough rest money to buy a strawberry cake and a donut!\")\n\t" +
                "else:\n\t\tprint(\"Sorry, there's a not enough money left for a strawberry shortcake and a donut.\")\n"+
                "else:\n\tprint(\"Sorry, you don't have enough money to buy a pepperoni pizza!\")\n \n# End of program"

    React.useEffect(() => {
        if(props.pageNumber === 1) {
            setAllowNext(q1Correct)
        } else if (props.pageNumber === 2) {
            setAllowNext(currentLineNumber === 14)
        }
    }, [q1Correct, currentLineNumber, setAllowNext])

    const getLine = (lineNumber: number) => {
        setLineNumber(lineNumber)
        if(lineNumber < 3) {
            setCurrentImage("")
        } else if (lineNumber === 3) {
            setCurrentImage("/FlowchartsBook/ChangingCondition/example4_1.svg")
            setP3Text("At the point, all of the variables are created.")
        } else if (lineNumber === 4 || lineNumber === 5) {
            setCurrentImage("/FlowchartsBook/ChangingCondition/example4_2.svg")
            setP3Text("pepperoni_price is less than your_money, so the True arrow will be followed.")
            setImageDim([1000, 1000])
        } else if (lineNumber === 6) {
            setCurrentImage("/FlowchartsBook/ChangingCondition/example4_2.svg")
            setP3Text("The variable rest_money is created and will have the value 5.")
            setImageDim([1000, 1000])
        } else if (lineNumber === 7 || lineNumber === 8) {
            setCurrentImage("/FlowchartsBook/example_4.svg")
            setP3Text("rest_money is equal to cake_price + donut_price. So, the True arrow is followed.")
            setImageDim([1200, 1200])
        } else if (lineNumber === 14) {
            setP3Text("The rest of code is skipped since they are 'else' and the program ends.")
        }
    }

    function handleQ1(correct: boolean) {
        if(correct) {
            setQ1AnswerExplanation("Correct! We had enough money to buy the pizza, cake, and donut!")
            setQ1Correct(true)
        } else {
            setQ1AnswerExplanation("Incorrect. Do we have enough money to buy the pizza, cake, and a donut? Try again!")
        }
    }

    if(props.pageNumber === 1) {
        return getPage1()
    } else if (props.pageNumber === 2) {
        return getPage2()
    }

    function getPage1() {
        return (
            <div className='flex flex-col items-center text-center w-full' style={{zoom: windowScale}}>
                <Image height={1300} width={1300} src={"/FlowchartsBook/example_4.svg"} alt='Image of flow chart.'/>
                <div className='flex flex-col gap-5'>
                    <div style={text_style}><Reader text='What is the final result that the flowchart above will print.'/></div>
                    <button style={answer_button_style} type='button' onClick={() => handleQ1(true)}>
                        {"Yes, you have enough money to buy a peperoni pizza!\nYes, you have rest money to buy a strawberry cake and a donut!"}
                    </button>
                    <button style={answer_button_style} type='button' onClick={() => handleQ1(false)}>
                        {"Yes, you have enough money to buy a peperoni pizza!\nSorry, there's not enough money left for a strawberry shortcake and a donut."}
                    </button>
                    <div className='flex justify-center'><Reader text={q1AnswerExplanation}/></div>
                </div>
            </div>
        );
    }

    function getPage2() {
        return (
            <div className='flex flex-col items-center text-center w-full' style={{zoom: windowScale}}>
                <CodeStep props={{code: code, skipLines: [9, 10, 11, 12, 13], enableNext: true, getLine: getLine}}/>
                <div className='flex flex-col text-center mt-5'>
                    {p3Text !== "" && <Reader text={p3Text}/>}
                    {currentImage !== "" && <Image height={imageDim[0]} width={imageDim[1]} src={currentImage} alt='Image of flow chart'/>}
                </div>
            </div>
        );
    }
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