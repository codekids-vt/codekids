import React, { useState } from 'react';
import { Reader } from '../../Reader';
import Image from 'next/image'
import { CodeStep } from '../../CodeStep';
import { GetWindowScale } from '../GetWindowScale';
import { Question, Answer, Styles } from '@/components/Question';

export interface IMultipleConditionsProps {
    pageNumber: number
}

export function MultipleConditions({ props, setAllowNext }: { props: any | IMultipleConditionsProps, setAllowNext: React.Dispatch<React.SetStateAction<boolean>> }) {

    const windowScale = GetWindowScale()

    const q1Answers : Answer[] = [
        {
            answerText: "Great! You can buy a pepperoni pizza!",
            answerExplanation: "Incorrect. Do you have enough money to buy a pizza? If not, follow the False arrow. Try again!",
            correct: false
        },
        {
            answerText: "Great! You have enough money to buy a healthy green salad!",
            answerExplanation: "Incorrect. Do you have enough money to buy a salad? If not, follow the False arrow. Try again!",
            correct: false
        },
        {
            answerText: "Great! You can buy a delicious bacon & beef burger!",
            answerExplanation: "Correct! Following the arrows, you eventually get to the third condition where you compare your money to the burger price. You are able to buy a burger!",
            correct: true
        },
        {
            answerText: "Sadly, you don't have enough money to buy, whether it's pepperoni pizza or a green salad or a burger.",
            answerExplanation: "Incorrect. Did you have enough money to buy a burger? If so, follow the True arrow. Try again!",
            correct: false
        }
    ]
    
    const [currentImage, setCurrentImage] = useState("")
    const [imageDim, setImageDim] = useState([600, 600])

    const [q1Correct, setQ1Correct] = useState(false)

    const [p2Text, setP2Text] = useState("")
    const [currentLineNumber, setLineNumber] = useState(0)

    const code = "my_money = 7\npepperoni_price = 11\nsalad_price = 8\nburger_price = 5\nif my_money >= pepperoni_price:\n\tprint(\"Great! You can buy a pepperoni pizza!\")\n" +
                "else if my_money >= salad_price:\n\tprint(\"Great! You have enough money to buy a healthy green salad!\")\n" +
                "else if my_money >= burger_price:\n\tprint(\"Great! You can buy a delicious bacon & beef burger!\")\n" +
                "else:\n\tprint(\"Sadly, you don't have enough money to buy, whether it's a pepperoni pizza or a green salad or a burger.\")\n \n# End of program"

    React.useEffect(() => {
        if(props.pageNumber === 2) {
            setAllowNext(q1Correct)
        } else if (props.pageNumber === 3) {
            setAllowNext(currentLineNumber === 13)
        }
    }, [q1Correct, currentLineNumber, props.pageNumber, setAllowNext])

    const getLine = (lineNumber: number) => {
        setLineNumber(lineNumber)
        if(lineNumber < 3) {
            setCurrentImage("")
            setP2Text("")
        } else if (lineNumber === 3) {
            setCurrentImage("/FlowchartsBook/MultipleConditions/example3_1.svg")
            setImageDim([750, 750])
            setP2Text("At the point, all of the variables are created.")
        } else if (lineNumber === 4) {
            setCurrentImage("/FlowchartsBook/MultipleConditions/example3_2.svg")
            setP2Text("my_money is less than pepperoni_price, so we'll follow the False arrow.")
        } else if (lineNumber === 6) {
            setCurrentImage("/FlowchartsBook/MultipleConditions/example3_3.svg")
            setP2Text("my_money is less than salad_price, so we'll follow the False arrow.")
        } else if (lineNumber === 8 || lineNumber === 9) {
            setCurrentImage("/FlowchartsBook/MultipleConditions/example3_4.svg")
            setP2Text("my_money is greater than burger_price, so we'll follow the True arrow!")
        } else if (lineNumber === 13) {
            setP2Text("We then follow the arrow to the end of the program!")
        }
    }

    if(props.pageNumber === 1) {
        return getPage1()
    } else if (props.pageNumber === 2) {
        return getPage2()
    }else if (props.pageNumber === 3) {
        return getPage3()
    }

    function getPage1() {
        return(
            <div className='flex flex-col items-center text-center w-full' style={{zoom: windowScale}}>
                <Image width={800} height={800} src={"/FlowchartsBook/MultipleConditions/food.png"} alt='Image of food.'/>
                <Image width={800} height={800} src={"/FlowchartsBook/example_3.svg"} alt='Image of food.'/>
            </div>
        );
    }


    function getPage2() {
        return(
            <div className='flex flex-col items-center text-center w-full' style={{zoom: windowScale}}>
                <div className='grid grid-cols-2 col-span-2'>
                    <Image className='m-auto col-span-1' width={120} height={120} src={"/FlowchartsBook/MultipleConditions/food2.png"} alt='Image of food.'/>
                    <div className='w-9/12'><Question question='What is the final result that the flowchart will print?' answers={q1Answers} style={Styles.VERTICAL} setCorrect={setQ1Correct}/></div>
                </div>
                <Image width={800} height={800} src={"/FlowchartsBook/example_3.svg"} alt='Image of food.'/>
            </div>
        );
    }


    function getPage3() {
        return(
            <div className='flex flex-col gap-5 w-full h-screen' style={{zoom: windowScale}}>
                <div className='flex flex-col gap-5 mb-10'>
                    <div style={text_style}><Reader text="Let's run through the code and see how it relates to the flowchart!"/></div>
                    <div style={text_style}><Reader text="The flowchart will be constructed as you go through the code."/></div>
                </div>
                <div className='flex flex-col-2 items-start text-center w-full h-100'>
                    <div className='w-1/2'>
                        <CodeStep props={{code: code, skipLines: [5, 7, 10, 11, 12], enableNext: true, getLine: getLine}}/>
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