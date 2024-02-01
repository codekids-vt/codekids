import React, { useState } from 'react';
import { Reader } from '../Reader';
import Image from 'next/image'
import { CodeSnippet } from '../CodeSnippet';
import { Answer, Question, Styles } from '../Question';

export function LogicalOperators({ props, setAllowNext }: { props: any, setAllowNext: React.Dispatch<React.SetStateAction<boolean>> }) {


    const q1Answers: Answer[] = [
        {
            answerText: "True",
            answerExplanation: "Correct! derek_color is equal to cream and josie_color is equal to cream.",
            correct: true
        },
        {
            answerText: "False",
            answerExplanation: "Incorrect. Is derek_color equal to cream and josie_color equal to cream? Try again!",
            correct: false
        }
    ]

    const q2Answers: Answer[] = [
        {
            answerText: "True",
            answerExplanation: "Correct! Because derek_color is equal to cream, it doesn't matter that wagner_color is not equal to cream. OR only cares that one of them is True.",
            correct: true
        },
        {
            answerText: "False",
            answerExplanation: "Incorrect. Remember OR gives True as long as at least one of the Booleans is True. Are either of the Booleans true? Try again!",
            correct: false
        }
    ]

    const q3Answers: Answer[] = [
        {
            answerText: "True",
            answerExplanation: "Incorrect. derek_color is equal to 'cream', which means derek_color == 'cream' is True, but we want to get the NOT of that. Try again!",
            correct: false
        },
        {
            answerText: "False",
            answerExplanation: "Correct! derek_color is equal to 'cream', which means derek_color == 'cream' is True, so the NOT of that is False",
            correct: true
        }
    ]

    const snippetCode = <p>
                            derek_color = <span style={code_string_style}>{"'cream'"}</span><br/>
                            wagner_color = <span style={code_string_style}>{"'black'"}</span><br/>
                            josie_color = <span style={code_string_style}>{"'cream'"}</span> 
                        </p>

    const [q1ChosenAnswer, setQ1ChosenAnswer] = useState("?")
    const [q2ChosenAnswer, setQ2ChosenAnswer] = useState("?")
    const [q3ChosenAnswer, setQ3ChosenAnswer] = useState("?")

    const [q1Correct, setQ1Correct] = useState(false)
    const [q2Correct, setQ2Correct] = useState(false)
    const [q3Correct, setQ3Correct] = useState(false)

    React.useEffect(() => {
        if (props.pageNumber === 2) {
            setAllowNext(q1Correct)
        } else if (props.pageNumber === 3) {
            setAllowNext(q2Correct)
        } else if (props.pageNumber === 4) {
            setAllowNext(q3Correct)
        }
    }, [q1Correct, q2Correct, q3Correct, props.pageNumber, setAllowNext])


    function handleQ1(button: HTMLButtonElement) {
        setQ1ChosenAnswer(button.textContent !== null ? button.textContent : "?")
    }

    function handleQ2(button: HTMLButtonElement) {
        setQ2ChosenAnswer(button.textContent !== null ? button.textContent : "?")
    }

    function handleQ3(button: HTMLButtonElement) {
        setQ3ChosenAnswer(button.textContent !== null ? button.textContent : "?")
    }
    
    if(props.pageNumber === 1) {
        return getPage1()
    } else if (props.pageNumber === 2) {
        return getPage2()
    } else if (props.pageNumber === 3) {
        return getPage3()
    } else if (props.pageNumber === 4) {
        return getPage4()
    }

    function codeSnippet() {
        return (
            <div className='flex flex-col-2 m-5 items-center gap-36'>
                <Image width={300} height={300} src='/IfStatementsBook/therapy_dog_1.png' alt="Image of therapy dogs with their names."/>
                <div>
                    <span className="font-semibold text-lg text-center"><Reader text='Use the code snippet below to answer the question.'/></span>
                    <CodeSnippet code={snippetCode}/>
                </div>
            </div>
        );
    }

    function getPage1() {
        return (
            <div className='flex flex-col w-full text-center items-center gap-5'>
                {codeSnippet()}
                <div className="font-semibold text-lg text-center"><Reader text='The next few pages will have questions about the code above and logical operators.'/></div>
            </div>
        );
    }

    function getPage2() {
        return(
            <div className='flex flex-col w-full text-center items-center gap-5'>
                {codeSnippet()}                    
                <div className="font-semibold text-lg text-center"><Reader text='AND Operator'/></div>
                    <div className="font-semibold text-lg text-center"><Reader text='Simply ask "are both of these true?"'/></div>
                    <div className='text-base'>(derek_color == <span style={code_string_style}>{"'cream'"}</span>) <span style={code_logical_operator_style}>and</span> (josie_color == <span style={code_string_style}>{"'cream'"}</span>) = <span style={code_boolean_style}>{q1ChosenAnswer}</span></div>
                <Question question='' answers={q1Answers} style={Styles.HORIZONTAL} setCorrect={setQ1Correct} buttonPressed={handleQ1}/>
            </div>
        );
    }


    function getPage3() {
        return(
            <div className='flex flex-col w-full text-center items-center gap-5'>
                {codeSnippet()}
                <div className="font-semibold text-lg text-center"><Reader text='OR Operator'/></div>
                    <div className="font-semibold text-lg text-center"><Reader text='Simply ask "are either of these true?"'/></div>
                    <div className='text-base'>(derek_color == <span style={code_string_style}>{"'cream'"}</span>) <span style={code_logical_operator_style}>or</span> (wagner_color == <span style={code_string_style}>{"'cream'"}</span>) = <span style={code_boolean_style}>{q2ChosenAnswer}</span></div>
                <Question question='' answers={q2Answers} style={Styles.HORIZONTAL} setCorrect={setQ2Correct} buttonPressed={handleQ2}/>
            </div>
        );
    }

    function getPage4() {
        return(
            <div className='flex flex-col w-full text-center items-center gap-5'>
                {codeSnippet()}
                <div className="font-semibold text-lg text-center"><Reader text='NOT Operator'/></div>
                    <div className="font-semibold text-lg text-center"><Reader text='Simply ask "what is the opposite?"'/></div>
                    <div className='text-base'> <span style={code_logical_operator_style}>not</span>(derek_color == <span style={code_string_style}>{"'cream'"}</span>) = <span style={code_boolean_style}>{q3ChosenAnswer}</span></div>
                    <Question question='' answers={q3Answers} style={Styles.HORIZONTAL} setCorrect={setQ3Correct} buttonPressed={handleQ3}/>
            </div>
        );   
    }
    
}

const code_string_style = {
    color: "#b87554"
}

const code_boolean_style = {
    color: "#669955"
}

const code_logical_operator_style = {
    color: "#00a635"
}
