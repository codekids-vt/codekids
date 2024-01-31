import React, { Dispatch, SetStateAction, useState } from 'react'
import Image from 'next/image'
import { Answer, Question, Styles } from '../Question'
import { CodeSnippet } from '../CodeSnippet'

export interface IVariableAssignmentProps {
    pageNumber: number
}


export function VariableAssignment({ props, setAllowNext }: { props: any | IVariableAssignmentProps, setAllowNext: Dispatch<SetStateAction<boolean>> }) {

    const p1Code = <p>
                        anniversary = <span style={code_integer_style}>147</span><br/>
                        print(anniversary)<br/>
                        {'print("A year has passed!")'}<br/>
                        anniversary = <span style={code_integer_style}>148</span><br/>
                        print(anniversary)<br/>
                    </p>

    const p2Code = <p>
                        anniversary = <span style={code_integer_style}>147</span><br/>
                        print(anniversary)<br/>
                        {'print("A year has passed!")'}<br/>
                        anniversary = anniversary + <span style={code_integer_style}>1</span><br/>
                        print(anniversary)<br/>
                    </p>

    const q1Answers : Answer[] = [
        {
            answerText: "147\nA year has passed!\n148",
            answerExplanation: "Correct! anniversary is originally 147 and is then changed to 148.",
            correct: true
        },
        {
            answerText: "147\nA year has passed!\n147",
            answerExplanation: "Incorrect. Remember the old value of a variable is lost when it's assigned a new value. Try again!",
            correct: false
        },
        {
            answerText: "147\nA year has passed!\n295",
            answerExplanation: "Incorrect. Assigning a variable a new value DOES NOT add it with the old value. The variable is simply assigned the new value. Try again!",
            correct: false
        }
    ]

    const q2Answers : Answer[] = [
        {
            answerText: "147\nA year has passed!\n148",
            answerExplanation: "Correct! anniversary is reassigned to its previous value + 1 which is 148.",
            correct: true
        },
        {
            answerText: "147\nA year has passed!\nanniversary + 1",
            answerExplanation: "Incorrect. anniversary is being set to it's previous value + 1 (anniversary + 1). Not the expression itself.",
            correct: false
        },
        {
            answerText: "147\nA year has passed!\n147",
            answerExplanation: "Incorrect. Notice that anniversary is being reassigned after a year has passed to anniversary + 1",
            correct: false
        }
    ]


    const [q1Correct, setQ1Correct] = useState(false)
    const [q2Correct, setQ2Correct] = useState(false)

    React.useEffect(() => {
        if(props.pageNumber == 1){
            setAllowNext(q1Correct)
        } else if(props.pageNumber === 2) {
            setAllowNext(q2Correct)
        }
    }, [q1Correct, q2Correct, props.pageNumber, setAllowNext])

    if(props.pageNumber === 1) {
        return getPage1()
    } else if (props.pageNumber === 2) {
        return getPage2()
    }

    function getPage1() {
        return (
            <div className='flex flex-col w-full text-center items-center'>
                <div className='flex flex-col-2 m-5 items-center gap-56'>
                    <Image width={200} height={200} src={"/VariablesBook/hokie-bird-148.png"} alt='Image of Hokie Bird holding 148th birthday sign.'/>
                    <CodeSnippet code={p1Code}/>
                </div>
                <Question question='What is printed when this program runs?' answers={q1Answers} style={Styles.HORIZONTAL} setCorrect={setQ1Correct}/>
            </div>
        );
    }

    function getPage2() {
        return( 
            <div className='flex flex-col w-full text-center items-center'>
                <div className='flex flex-col-2 m-5 items-center gap-56'>
                    <Image width={200} height={200} src={"/VariablesBook/hokie-bird-148.png"} alt='Image of Hokie Bird holding 148th birthday sign.'/>
                    <CodeSnippet code={p2Code}/>
                </div>                
                <Question question='What is printed when this program runs?' answers={q2Answers} style={Styles.HORIZONTAL} setCorrect={setQ2Correct}/>
            </div>
        );
    }

}

const code_integer_style = {
    color: "#ff6371"
}