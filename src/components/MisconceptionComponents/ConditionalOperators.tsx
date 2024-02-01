import React, { useState } from 'react';
import { Reader } from '../Reader';
import Image from 'next/image'
import { CodeSnippet } from '../CodeSnippet';
import { Answer, Question, Styles } from '../Question';

export interface IConditionalOperatorsProps {
    pageNumber: number
}

export function ConditionalOperators({ props, setAllowNext }: { props: any | IConditionalOperatorsProps, setAllowNext: React.Dispatch<React.SetStateAction<boolean>> }) {

    const q1Answers : Answer[] = [
        {
            answerText: "True",
            answerExplanation: "Incorrect. Are the values of derek_color and wagner_color equal? Try again!",
            correct: false
        },
        {
            answerText: "False",
            answerExplanation: "Correct! 'black' is not equal to 'cream'.",
            correct: true
        },
        {
            answerText: "None",
            answerExplanation: "Incorrect. Remember the result of == is alway True or False. Try again!",
            correct: false
        }
    ]

    const q2Answers: Answer[] = [
        {
            answerText: "True",
            answerExplanation: "Correct! 'cream' is equal to 'cream'!",
            correct: true
        },
        {
            answerText: "False",
            answerExplanation: "Incorrect. Are the values of derek_color and josie_color equal? Try again!",
            correct: false
        },
        {
            answerText: "None",
            answerExplanation: "Incorrect. Remember the result of == is alway True or False. Try again!",
            correct: false
        }
    ]

    const q3Answers: Answer[] = [
        {
            answerText: "True",
            answerExplanation: "Incorrect. Notice that total_number is a string. Try again!",
            correct: false
        },
        {
            answerText: "False",
            answerExplanation: "Correct! total_number is a string while black_number and yellow_number are Integers. So it will be false.",
            correct: true
        },
        {
            answerText: "None",
            answerExplanation: "Incorrect. Remember the result of == is alway True or False. Try again!",
            correct: false
        }
    ]

    const q4Answers: Answer[] = [
        {
            answerText: "True",
            answerExplanation: "Incorrect. What are the data types of total_number and cream_number? Try again!",
            correct: false
        },
        {
            answerText: "False",
            answerExplanation: "Incorrect. What are the data types of total_number and cream_number? Try again!",
            correct: false
        },
        {
            answerText: "None",
             answerExplanation: "Correct! This is using > one a string and integer which can't be done.",
             correct: true
        }
    ]

    const [q1ChosenAnswer, setQ1ChosenAnswer] = useState("?")
    const [q2ChosenAnswer, setQ2ChosenAnswer] = useState("?")
    const [q3ChosenAnswer, setQ3ChosenAnswer] = useState("?")
    const [q4ChosenAnswer, setQ4ChosenAnswer] = useState("?")

    const [q1Correct, setQ1Correct] = useState(false)
    const [q2Correct, setQ2Correct] = useState(false)
    const [q3Correct, setQ3Correct] = useState(false)
    const [q4Correct, setQ4Correct] = useState(false)

    const p1Code = <p>
                        derek_color = <span style={code_string_style}>{'\'cream\''}</span><br/>
                        wagner_color = <span style={code_string_style}>{'\'black\''}</span><br/>
                        josie_color = <span style={code_string_style}>{'\'cream\''}</span><br/>
                        derek_color == wagner_color = <span style={code_boolean_style}>{q1ChosenAnswer}</span>
                    </p>

    const p2Code = <p>
                        derek_color = <span style={code_string_style}>{'\'cream\''}</span><br/>
                        wagner_color = <span style={code_string_style}>{'\'black\''}</span><br/>
                        josie_color = <span style={code_string_style}>{'\'cream\''}</span><br/>
                        derek_color == josie_color = <span style={code_boolean_style}>{q2ChosenAnswer}</span>
                    </p>

    const p3Code = <p>
                        black_number = <span style={code_integer_style}>1</span><br/>
                        cream_number = <span style={code_integer_style}>2</span><br/>
                        total_number == <span style={code_string_style}>{'\'3\''}</span><br/>
                        total_number == (black_number + cream_number) = <span style={code_boolean_style}>{q3ChosenAnswer}</span>
                    </p>

    const p4Code = <p>
                        black_number = <span style={code_integer_style}>1</span><br/>
                        cream_number = <span style={code_integer_style}>2</span><br/>
                        total_number == <span style={code_string_style}>{'\'3\''}</span><br/>
                        total_number {">"} cream_number = <span style={code_boolean_style}>{q4ChosenAnswer}</span>
                    </p>

    React.useEffect(() => {
        if (props.pageNumber === 1) {
            setAllowNext(q1Correct)
        } else if (props.pageNumber == 2) {
            setAllowNext(q2Correct)
        } else if (props.pageNumber === 3) {
            setAllowNext(q3Correct)
        } else if (props.pageNumber === 4) {
            setAllowNext(q4Correct)
        }

    }, [q1Correct, q2Correct, q3Correct, q4Correct, props.pageNumber, setAllowNext])

    function handleQ1(button: HTMLButtonElement) {
        setQ1ChosenAnswer(button.textContent !== null ? button.textContent : "?")
    }

    function handleQ2(button: HTMLButtonElement) {
        setQ2ChosenAnswer(button.textContent !== null ? button.textContent : "?")
    }

    function handleQ3(button: HTMLButtonElement) {
        setQ3ChosenAnswer(button.textContent !== null ? button.textContent : "?")
    }

    function handleQ4(button: HTMLButtonElement ) {
        setQ4ChosenAnswer(button.textContent !== null ? button.textContent : "?")
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

    function getPage1() {
        return (
            <div className='flex flex-col w-full text-center items-center gap-5'>
                <span className="font-semibold text-lg text-center"><Reader text='Test you knowledge about conditional operators!'/></span>
                <Image width={300} height={300} src='/IfStatementsBook/therapy_dog_1.png' alt="Image of therapy dogs with their names."/>
                <CodeSnippet code={p1Code}/>
                <Question question='What does derek_color == wagner_color evaluate to?' answers={q1Answers} style={Styles.HORIZONTAL} setCorrect={setQ1Correct} buttonPressed={handleQ1}/>
            </div>
        );
    }

    function getPage2() {
        return (
            <div className='flex flex-col w-full text-center items-center gap-5'>
                <Image width={300} height={300} src='/IfStatementsBook/therapy_dog_1.png' alt="Image of therapy dogs with their names."/>
                <CodeSnippet code={p2Code}/>
                <Question question='What does derek_color == josie_color evaluate to?' answers={q2Answers} style={Styles.HORIZONTAL} setCorrect={setQ2Correct} buttonPressed={handleQ2}/>
            </div>
        );
    }

    function getPage3() {
        return (
            <div className='flex flex-col w-full text-center items-center gap-5'>
                <Image width={300} height={300} src='/IfStatementsBook/therapy_dog_1.png' alt="Image of therapy dogs with their names."/>
                <CodeSnippet code={p3Code}/>
                <Question question='What does total_number == (black_number + cream_number) evaluate to?' answers={q3Answers} style={Styles.HORIZONTAL} setCorrect={setQ3Correct} buttonPressed={handleQ3}/>
            </div>
        );
    }

    function getPage4() {
        return (
            <div className='flex flex-col w-full text-center items-center gap-5'>
                <Image width={300} height={300} src='/IfStatementsBook/therapy_dog_1.png' alt="Image of therapy dogs with their names."/>
                <CodeSnippet code={p4Code}/>
                <Question question='What does total_number > cream_number evaluate to?' answers={q4Answers} style={Styles.HORIZONTAL} setCorrect={setQ4Correct} buttonPressed={handleQ4}/>
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

const code_integer_style = {
    color: "#ff6371"
}