import React, { useState } from 'react';
import { Reader } from '../../Reader';
import Image from 'next/image'
import { CodeStep } from '../../CodeStep';
import { GetWindowScale } from '../GetWindowScale';
import { Answer, Question, Styles } from '@/components/Question';

export interface IBuyMultipleProps {
    pageNumber: number
}

export function BuyMultiple({ props, setAllowNext }: { props: any | IBuyMultipleProps, setAllowNext: React.Dispatch<React.SetStateAction<boolean>> }) {

    const windowScale = GetWindowScale()

    const q1Answers : Answer[] = [
        {
            answerText: "Yes, you can buy spaghetti pasta, a burger, and an ice-cream!",
            answerExplanation: "Incorrect. Is the total cost of the food less than or equal to our money? Try again!",
            correct: false
        },
        {
            answerText: "Sorry, you don't have enough money to buy pasta, a burger, and an ice-cream.",
            answerExplanation: "Correct! total will be 11 which is not less than or equal to 9. So we will follow the False arrow.",
            correct: true
        }
    ]
    
    const [currentImage, setCurrentImage] = useState("")
    const [imageDim, setImageDim] = useState([600, 600])

    const [q1Correct, setQ1Correct] = useState(false)

    const [p2Text, setP2Text] = useState("")
    const [currentLineNumber, setLineNumber] = useState(0)

    const code = "your_money = 9\nburger_price = 5\npasta_price = 3\nice_cream_price = 3\ntotal = burger_price + pasta_price + ice_cream_price\n" +
                "if total <= your_money:\n\tprint(\"Yes, you can buy a spaghetti pasta, a burger, and an ice-cream!\")\nelse:\n\t" +
                "print(\"Sorry, you don't have enough money to buy a pasta, a burger, and an ice-cream.\")\n \n# End of program"

    React.useEffect(() => {
        if(props.pageNumber === 1) {
            setAllowNext(q1Correct)
        } else if (props.pageNumber === 2) {
            setAllowNext(currentLineNumber === 10)
        }
    }, [q1Correct, currentLineNumber, props.pageNumber, setAllowNext])

    const getLine = (lineNumber: number) => {
        setLineNumber(lineNumber)
        if(lineNumber < 3) {
            setCurrentImage("")
            setP2Text("")
        } else if (lineNumber === 4) {
            setCurrentImage("/FlowchartsBook/BuyMultiple/example2_1.svg")
            setP2Text("At this point, all of the variables are created.")
        } else if (lineNumber === 5) {
            setCurrentImage("/FlowchartsBook/BuyMultiple/example2_2.svg")
            setP2Text("Now the program needs to make a decision. It can either follow the True arrow or the False arrow.")
            setImageDim([1000, 1000])
        } else if (lineNumber === 7 || lineNumber === 8) {
            setCurrentImage("/FlowchartsBook/BuyMultiple/example2_2.svg")
            setP2Text("The program follows the False arrow since total is greater than your_money. This is the same as the 'else' in the code.")
            setImageDim([1000, 1000])
        } else if (lineNumber === 10) {
            setCurrentImage("/FlowchartsBook/example_2.svg")
            setP2Text("The program prints the sorry message and ends.")
            setImageDim([1200, 1200])
        }
    }

    if(props.pageNumber === 1) {
        return getPage1()
    } else if (props.pageNumber === 2) {
        return getPage2()
    }

    function getPage1()
    {
        return (
            <div className='flex flex-col items-center text-center w-full' style={{zoom: windowScale}}>
                <Image width={600} height={600} src={"/FlowchartsBook/BuyMultiple/buy_multiple.png"} alt='Image of flowchart and food.'/>
                <Question question='What is the final result that the flowchart above will print?' answers={q1Answers} style={Styles.VERTICAL} setCorrect={setQ1Correct}/>
            </div>
        );
    }

    function getPage2() {
        return (
            <div className='flex flex-col gap-5 w-full h-screen' style={{zoom: windowScale}}>
                <div className='flex flex-col gap-5 mb-10'>
                    <div style={text_style}><Reader text="Let's run through the code and see how it relates to the flowchart!"/></div>
                    <div style={text_style}><Reader text="The flowchart will be constructed as you go through the code."/></div>
                </div>
                <div className='flex flex-col-2 items-start text-center h-100'>
                    <div className='w-1/2'>
                        <CodeStep props={{code: code, skipLines: [6, 9], enableNext: true, getLine: getLine}}/>
                    </div>
                    <div className='flex flex-col text-center w-1/2'>
                        {p2Text !== "" && <Reader text={p2Text}/>}
                        {currentImage !== "" && <Image height={imageDim[0]} width={imageDim[1]} src={currentImage} alt='Image of flow chart'/>}
                    </div>
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