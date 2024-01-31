import React, { Dispatch, SetStateAction, useState } from 'react';
import { Reader } from '../Reader';
import Image from 'next/image'
import { Answer, Question, Styles } from '../Question';
import { CodeSnippet } from '../CodeSnippet';

export function Sequencing({ setAllowNext }: { setAllowNext: Dispatch<SetStateAction<boolean>> }) {

    const snippetCode = <p>
                    syracuse_score = <span style={code_integer_style}>10</span><br/>
                    hokies_score = <span style={code_integer_style}>38</span><br/>
                    different = hokies_score - syracuse_score<br/>
                    hokies_score = <span style={code_integer_style}>23</span><br/>
                    syracuse_score = <span style={code_integer_style}>22</span><br/>
                    print(different)
                </p>

    const lineNumbers = <p>1<br/>2<br/>3<br/>4<br/>5<br/>6</p>

    const q1Answers : Answer[] = [
        {
            answerText: "15",
            answerExplanation: "Incorrect. It is not 15. Read the code from top to bottom. What is different assigned to? Try again!",
            correct: false
        },
        {
            answerText: "0",
            answerExplanation: "Incorrect. It is not 0. Read the code from top to bottom. What is different assigned to? Try again!",
            correct: false
        },
        {
            answerText: "28",
            answerExplanation: "Correct! different is assigned before hokies_score and syracuse_score were reassigned. So different is assigned 28.",
            correct: true
        },
        {
            answerText: "1",
            answerExplanation: "Incorrect. Read the code from top to bottom. Notice different is assigned before hokies_score is reassigned to 23 and syracuse_score is reassigned to 22. What is different assigned to? Try again!",
            correct: false
        }
    ]

    const [q1Correct, setQ1Correct] = useState(false)

    React.useEffect(() => {
        setAllowNext(q1Correct)
    }, [q1Correct, setAllowNext])


    return (
        <div className='flex flex-col w-full text-center items-center'>
            <Image className='mb-5' width={400} height={400} src='/VariablesBook/vt_syracuse_score.png' alt="Image of therapy dogs with their names."/>
            <div className="font-semibold text-lg leading-8 text-center mb-3"><Reader text='We always read the code from top to bottom. The line numbers have been provided. (Yellow column).'/></div>
            <div className='flex flex-col-2 gap-0'>
                <CodeSnippet code={lineNumbers} backgroundColor='bg-yellow-300'/>
                <CodeSnippet code={snippetCode}/>
            </div>
            <Question question='What is printed when print(different) is called at the end?' answers={q1Answers} style={Styles.HORIZONTAL} setCorrect={setQ1Correct}/>
        </div>
    );
}

const code_integer_style = {
    color: "#ff6371"
}