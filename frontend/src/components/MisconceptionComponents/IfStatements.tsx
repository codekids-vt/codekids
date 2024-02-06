import React, { useState } from 'react';
import { Reader } from '../Reader';
import { CodeSnippet } from '../CodeSnippet';
import { MultipleChoiceQuestion, Styles } from '../Question';
import { Type, TypeStyle } from '../TypeStyle';
import { IfStatementsQuestions } from '../../util/QuestionBank';

export interface IIfStatementsProps {
    pageNumber: number
}

export function IfStatements({ props, setAllowNext }: { props: any | IIfStatementsProps, setAllowNext: React.Dispatch<React.SetStateAction<boolean>> }) {

    const q1 = IfStatementsQuestions["IfStatementsQ1"]
    const q2 = IfStatementsQuestions["IfStatementsQ2"]
    const q3 = IfStatementsQuestions["IfStatementsQ3"]
    const q4 = IfStatementsQuestions["IfStatementsQ4"]

    const p1Code = <p>
                        derek_is_happy = <TypeStyle text='True' style={Type.BOOLEAN}/><br/>
                        if derek_is_happy:<br/>
                        <span className='bg-yellow-200 opacity-80'>{"\t"}</span>print(<TypeStyle text='"True"' style={Type.STRING}/>)<br/>
                        else:<br/>
                        <span className='bg-yellow-200 opacity-80'>{"\t"}</span>print(<TypeStyle text='"False"' style={Type.STRING}/>)
                    </p>

    const p2Code = <p>
                        the_weather_is_bad = <TypeStyle text='True' style={Type.BOOLEAN}/><br/>
                        if the_weather_is_bad:<br/>
                        <span className='bg-yellow-200 opacity-80'>{"\t"}</span>print(<TypeStyle text='"Gosh, it looks like a rainstorm!"' style={Type.STRING}/>)<br/>
                        <span className='bg-yellow-200 opacity-80'>{"\t"}</span>print(<TypeStyle text='"We have to cancel the game."' style={Type.STRING}/>)<br/>
                        else:<br/>
                        <span className='bg-yellow-200 opacity-80'>{"\t"}</span>print(<TypeStyle text={'"Wow, it\'s a beautiful day!"'} style={Type.STRING}/>)<br/>
                        <span className='bg-yellow-200 opacity-80'>{"\t"}</span>print(<TypeStyle text={'"Let\'s enjoy the rest of the game!"'} style={Type.STRING}/>)<br/><br/>
                        print(<TypeStyle text={'"Hopefully it\'s sunny tomorrow!"'} style={Type.STRING}/>)
                    </p>

    const p3Code = <p>
                        anniversary = <TypeStyle text='148' style={Type.INTEGER}/><br/>
                        if anniversary == <TypeStyle text='200' style={Type.INTEGER}/>:<br/>
                        {"\t"}print(<TypeStyle text='"True"' style={Type.STRING}/>)<br/><br/>
                        print(<TypeStyle text='"False"' style={Type.STRING}/>)
                    </p>

    const p4Code = <p>
                        anniversary = <TypeStyle text='148' style={Type.INTEGER}/><br/>
                        hokie_bird_is_happy = <TypeStyle text='True' style={Type.BOOLEAN}/><br/>
                        if anniversary == <TypeStyle text='200' style={Type.INTEGER}/>
                        <TypeStyle text=' or' style={Type.BOOLEAN}/> hokie_bird_is_happy:<br/>
                        {"\t"}print(<TypeStyle text='"The Hokie Bird is happy!"' style={Type.STRING}/>)<br/><br/>
                        print(<TypeStyle text={'"Let\'s celebrate!"'} style={Type.STRING}/>)
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
    } else {
        return getPage4()
    }

    function getPage1() {
        return (
            <div className='flex flex-col w-full text-center items-center font-semibold text-lg text-center gap-5'>
                <div className='flex flex-col-2 m-5 items-center gap-36'>
                    <img width={400} height={400} src={"/IfStatementsBook/derek_happy.png"} alt='Image of Derek the therapy dog.' />
                    <div>
                        <Reader text='What is printed in the program?'/>
                        <CodeSnippet code={p1Code}/>
                    </div>
                </div>
                <Reader text='Notice that only the print("True") is part of the If-statement. The print("False") is part of the else.'/>
                <MultipleChoiceQuestion question={q1.question} answers={q1.answers} style={Styles.HORIZONTAL} setCorrect={setQ1Correct}/>
            </div>
        );
    }

    function getPage2() {
        return (
            <div className='flex flex-col w-full text-center items-center font-semibold text-lg text-center gap-5'>
                <div className='flex flex-col-2 m-5 items-center gap-36'>
                    <img width={300} height={300} src={"/IfStatementsBook/bad_weather.png"} alt='Image of storm over Lane Stadium.' />
                    <div>
                        <Reader text='What is printed in the program?'/>
                        <CodeSnippet code={p2Code}/>
                    </div>
                </div>
                <MultipleChoiceQuestion question={q2.question} answers={q2.answers} style={Styles.GRID2} setCorrect={setQ2Correct}/>
            </div>
        );
    }

    function getPage3() {
        return (
            <div className='flex flex-col w-full text-center items-center font-semibold text-lg text-center gap-5'>
                <div className='flex flex-col-2 m-5 items-center gap-36'>
                    <img width={250} height={250} src={"/VariablesBook/hokie-bird-148.png"} alt='Image of storm over Lane Stadium.' />
                    <div>
                        <Reader text='What is printed in the program below?'/>
                        <CodeSnippet code={p3Code}/>
                    </div>
                </div>
                <MultipleChoiceQuestion question={q3.question} answers={q3.answers} style={Styles.HORIZONTAL} setCorrect={setQ3Correct}/>
            </div>
        );
    }

    function getPage4() {
        return(
            <div className='flex flex-col w-full text-center items-center font-semibold text-lg text-center gap-5'>
                <div className='flex flex-col-2 m-5 items-center gap-36'>
                    <img width={250} height={250} src={"/VariablesBook/hokie-bird-148.png"} alt='Image of storm over Lane Stadium.' />
                    <CodeSnippet code={p4Code}/>
                </div>
                <MultipleChoiceQuestion question={q4.question} answers={q4.answers} style={Styles.GRID2} setCorrect={setQ4Correct}/>
            </div>
        );
    }
}