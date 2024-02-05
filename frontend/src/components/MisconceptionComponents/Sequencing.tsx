import React, { Dispatch, SetStateAction, useState } from 'react';
import { Reader } from '../Reader';
import Image from 'next/image'
import { MultipleChoiceQuestion, Styles } from '../Question';
import { CodeSnippet } from '../CodeSnippet';
import { TypeStyle, Type } from '../TypeStyle';
import { VariablesQuestions } from '../../util/QuestionBank';

export function Sequencing({ setAllowNext }: { setAllowNext: Dispatch<SetStateAction<boolean>> }) {

    const q1 = VariablesQuestions["SequencingQ1"]

    const snippetCode = <p>
        syracuse_score = <TypeStyle text='10' style={Type.INTEGER} /><br />
        hokies_score = <TypeStyle text='38' style={Type.INTEGER} /><br />
        different = hokies_score - syracuse_score<br />
        hokies_score = <TypeStyle text='23' style={Type.INTEGER} /><br />
        syracuse_score = <TypeStyle text='22' style={Type.INTEGER} /><br />
        print(different)
    </p>

    const lineNumbers = <p>1<br />2<br />3<br />4<br />5<br />6</p>

    const [q1Correct, setQ1Correct] = useState(false)

    React.useEffect(() => {
        setAllowNext(q1Correct)
    }, [q1Correct, setAllowNext])


    return (
        <div className='flex flex-col w-full text-center items-center font-semibold text-lg text-center gap-3'>
            <img className='mb-5' width={400} height={400} src='/VariablesBook/vt_syracuse_score.png' alt="Image of therapy dogs with their names." />
            <Reader text='We always read the code from top to bottom. The line numbers have been provided. (Yellow column).' />
            <div className='flex flex-col-2 gap-0'>
                <CodeSnippet code={lineNumbers} backgroundColor='bg-yellow-300' />
                <CodeSnippet code={snippetCode} />
            </div>
            <MultipleChoiceQuestion question={q1.question} answers={q1.answers} style={Styles.HORIZONTAL} setCorrect={setQ1Correct} />
        </div>
    );
}