import React, { useState } from 'react';
import { Reader } from '../Reader';
import { GetWindowScale } from './GetWindowScale';
import Image from 'next/image'
import { CodeSnippet } from '../CodeSnippet';
import { Answer, Question, Styles } from '../Question';

export interface IIfStatementsProps {
    pageNumber: number
}

export function IfStatements({ props, setAllowNext }: { props: any | IIfStatementsProps, setAllowNext: React.Dispatch<React.SetStateAction<boolean>> }) {

    const windowScale = GetWindowScale()

    const q1Answers: Answer[] = [
        {
            answerText: "True\nFalse",
            answerExplanation: "Incorrect. Remember that the else isn't executed when the If-statement is True. Try again!",
            correct: false
        },
        {
            answerText: "True",
            answerExplanation: "Correct! derek_is_happy is True so everything indented under the If-statement will be executed and the else will be skipped.",
            correct: true
        },
        {
            answerText: "False",
            answerExplanation: "Incorrect. When the condition for the If-Statement is True, everything indented under the If-statement will be executed. Try again!",
            correct: false
        },
        {
            answerText: "Nothing will\nbe printed.",
            answerExplanation: "Incorrect. If the condition of the If-statement is True, everything indented under the If-statement will be executed. If the condition is false, the else will be executed. Try again!",
            correct: false
        }
    ]

    const q2Answers: Answer[] = [
        {
            answerText: "Wow, it's a beautiful day!\nLet's enjoy the rest of the game!\nHopefully it's sunny tomorrow!",
            answerExplanation: "Incorrect. Is the condition in the If-statement True? Try again!",
            correct: false
        },
        {
            answerText: "Gosh, it looks like a rainstorm!\nWe have to cancel the game.\nHopefully it's sunny tomorrow!",
            answerExplanation: "Correct! The If-statement will execute. Also, the final print is not part of either the if-statement or else, so it is also printed.",
            correct: true
        },
        {
            answerText: "Gosh, it looks like a rainstorm!\nWe have to cancel the game.\n",
            answerExplanation: "Incorrect. Pay attention to the final print. Is it part of either the If-statement or else? Try again!",
            correct: false
        },
        {
            answerText: "Wow, it's a beautiful day!\nLet's enjoy the rest of the game!",
            answerExplanation: "Incorrect. Is the condition in the If-statement True? Also is the final print part of the If-statement or else? Try again!",
            correct: false
        }
    ]

    const q3Answers: Answer[] = [
        {
            answerText: "True\nFalse",
            answerExplanation: "Incorrect. Is the condition in the If-statement true? Try again!",
            correct: false
        },
        {
            answerText: "True",
            answerExplanation: "Incorrect. Is the condition in the If-statement true? Also the program will continue to execute after an If-statement. Try again!",
            correct: false
        },
        {
            answerText: "False",
            answerExplanation: "Correct! The condition in the If-statement is false, so the If-statement will be skipped and the program will continue and print \"False\".",
            correct: true,
        },
        {
            answerText:"Nothing will be printed.",
            answerExplanation: "Incorrect. A program will continue to execute even if a If-statement's condition is False. Also, the final print is not indented, so it's not part of the If-statement. Try again!",
            correct: false
        }
    ]

    const q4Answers: Answer[] = [
        {
            answerText: "Let's celebrate!",
            answerExplanation: "Incorrect. Notice the OR logical operator is being used in the If-Statement. So, if either of the conditions are True the whole statement is True. Try again!",
            correct: false
        },
        {
            answerText: "The Hokie Bird is happy!",
            answerExplanation: "Incorrect. Remember that the program continues to execute after an If-statement. Try again!",
            correct: false
        },
        {
            answerText: "The Hokie Bird is happy!\nLet's celebrate!",
            answerExplanation: "Correct! hokie_bird_is_happy is True so the If-statement will pass since the OR logical operator was used.",
            correct: true
        },
        {
            answerText: "Nothing will be printed.",
            answerExplanation: "Incorrect. Notice the OR logical operator is being used in the If-statement. Also the final print is not part of the If-statement. Try again!",
            correct: false
        }
    ]

    const p1Code = <p>
                        derek_is_happy = <span style={code_boolean_style}>True</span><br/>
                        if derek_is_happy:<br/>
                        <span style={{backgroundColor: "yellow", opacity: "0.6"}}>{"\t"}</span>print(<span style={code_string_style}>{'"True"'}</span>)<br/>
                        else:<br/>
                        <span style={{backgroundColor: "yellow", opacity: "0.6"}}>{"\t"}</span>print(<span style={code_string_style}>{'"False"'}</span>)
                    </p>

    const p2Code = <p>
                        the_weather_is_bad = <span style={code_boolean_style}>True</span><br/>
                        if the_weather_is_bad:<br/>
                        <span style={{backgroundColor: "yellow", opacity: "0.6"}}>{"\t"}</span>print(<span style={code_string_style}>{'"Gosh, it looks like a rainstorm!"'}</span>)<br/>
                        <span style={{backgroundColor: "yellow", opacity: "0.6"}}>{"\t"}</span>print(<span style={code_string_style}>{'"We have to cancel the game."'}</span>)<br/>
                        else:<br/>
                        <span style={{backgroundColor: "yellow", opacity: "0.6"}}>{"\t"}</span>print(<span style={code_string_style}>{'"Wow, it\'s a beautiful day!"'}</span>)<br/>
                        <span style={{backgroundColor: "yellow", opacity: "0.6"}}>{"\t"}</span>print(<span style={code_string_style}>{'"Let\'s enjoy the rest of the game!"'}</span>)<br/><br/>
                        print(<span style={code_string_style}>{'"Hopefully it\'s sunny tomorrow!"'}</span>)
                    </p>

    const p3Code = <p>
                        anniversary = <span style={code_integer_style}>148</span><br/>
                        if anniversary == <span style={code_integer_style}>200</span>:<br/>
                        {"\t"}print(<span style={code_string_style}>{'"True"'}</span>)<br/><br/>
                        print(<span style={code_string_style}>{'"False"'}</span>)
                    </p>

    const p4Code = <p>
                        anniversary = <span style={code_integer_style}>148</span><br/>
                        hokie_bird_is_happy = <span style={code_boolean_style}>True</span><br/>
                        if anniversary == <span style={code_integer_style}>200</span>
                        <span style={code_logical_operator_style}> or </span>hokie_bird_is_happy:<br/>
                        {"\t"}print(<span style={code_string_style}>{'"The Hokie Bird is happy!"'}</span>)<br/><br/>
                        print(<span style={code_string_style}>{'"Let\'s celebrate!"'}</span>)
                    </p>

    const [q1Correct, setQ1Correct] = useState(false)
    const [q2Correct, setQ2Correct] = useState(false)
    const [q3Correct, setQ3Correct] = useState(false)
    const [q4Correct, setQ4Correct] = useState(false)

    React.useEffect(() => {
        if (props.pageNumber === 1) {
            setAllowNext(q1Correct)
        } else if (props.pageNumber === 2) {
            setAllowNext(q2Correct)
        } else if (props.pageNumber === 3) {
            setAllowNext(q3Correct)
        } else if (props.pageNumber === 4) {
            setAllowNext(q4Correct)
        }
    }, [q1Correct, q2Correct, q3Correct, q4Correct, props.pageNumber, setAllowNext])

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
                <div className='flex flex-col-2 m-5 items-center gap-36'>
                    <Image width={400} height={400} src={"/IfStatementsBook/derek_happy.png"} alt='Image of Derek the therapy dog.'/>
                    <div>
                        <div className="font-semibold text-lg text-center"><Reader text='What is printed in the program?'/></div>
                        <CodeSnippet code={p1Code}/>
                    </div>
                </div>
                <div className="font-semibold text-lg text-center"><Reader text='Notice that only the print("True") is part of the If-statement. The print("False") is part of the else.'/></div>
                <Question question='' answers={q1Answers} style={Styles.HORIZONTAL} setCorrect={setQ1Correct}/>
            </div>
        );
    }

    function getPage2() {
        return (
            <div className='flex flex-col w-full text-center items-center gap-5'>
                <div className='flex flex-col-2 m-5 items-center gap-36'>
                    <Image width={300} height={300} src={"/IfStatementsBook/bad_weather.png"} alt='Image of storm over Lane Stadium.'/>
                    <div>
                        <div className="font-semibold text-lg text-center"><Reader text='What is printed in the program?'/></div>
                        <CodeSnippet code={p2Code}/>
                    </div>
                </div>
                <Question question='' answers={q2Answers} style={Styles.GRID2} setCorrect={setQ2Correct}/>
            </div>
        );
    }

    function getPage3() {
        return (
            <div className='flex flex-col w-full text-center items-center gap-5'>
                <div className='flex flex-col-2 m-5 items-center gap-36'>
                    <Image width={250} height={250} src={"/VariablesBook/hokie-bird-148.png"} alt='Image of storm over Lane Stadium.'/>
                    <div>
                        <div className="font-semibold text-lg text-center"><Reader text='What is printed in the program below?'/></div>
                        <CodeSnippet code={p3Code}/>
                    </div>
                </div>
                <Question question='' answers={q3Answers} style={Styles.HORIZONTAL} setCorrect={setQ3Correct}/>
            </div>
        );
    }

    function getPage4() {
        return(
            <div className='flex flex-col w-full text-center items-center gap-5'>
                <div className='flex flex-col-2 m-5 items-center gap-36'>
                    <Image width={250} height={250} src={"/VariablesBook/hokie-bird-148.png"} alt='Image of storm over Lane Stadium.'/>
                    <CodeSnippet code={p4Code}/>
                </div>
                <Question question='' answers={q4Answers} style={Styles.GRID2} setCorrect={setQ4Correct}/>
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

const code_integer_style = {
    color: "#ff6371"
}