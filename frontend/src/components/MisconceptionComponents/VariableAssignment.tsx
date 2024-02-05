import React, { Dispatch, SetStateAction, useState } from 'react'
import { MultipleChoiceQuestion, Styles } from '../Question'
import { CodeSnippet } from '../CodeSnippet'
import { VariablesQuestions } from '../../util/QuestionBank'
import { Type, TypeStyle } from '../TypeStyle'

export interface IVariableAssignmentProps {
    pageNumber: number
}


export function VariableAssignment({ props, setAllowNext }: { props: any | IVariableAssignmentProps, setAllowNext: Dispatch<SetStateAction<boolean>> }) {

    const p1Code = <p>
        anniversary = <TypeStyle text='147' style={Type.INTEGER} /><br />
        print(anniversary)<br />
        {'print("A year has passed!")'}<br />
        anniversary = <TypeStyle text='148' style={Type.INTEGER} /><br />
        print(anniversary)<br />
    </p>

    const p2Code = <p>
        anniversary = <TypeStyle text='147' style={Type.INTEGER} /><br />
        print(anniversary)<br />
        {'print("A year has passed!")'}<br />
        anniversary = anniversary + <TypeStyle text='1' style={Type.INTEGER} /><br />
        print(anniversary)<br />
    </p>

    const q1 = VariablesQuestions["VariableAssignmentQ1"]
    const q2 = VariablesQuestions["VariableAssignmentQ2"]


    const [q1Correct, setQ1Correct] = useState(false)
    const [q2Correct, setQ2Correct] = useState(false)

    React.useEffect(() => {
        if (props.pageNumber == 1) {
            setAllowNext(q1Correct)
        } else if (props.pageNumber === 2) {
            setAllowNext(q2Correct)
        }
    }, [q1Correct, q2Correct, props.pageNumber, setAllowNext])

    if (props.pageNumber === 1) {
        return getPage1()
    } else if (props.pageNumber === 2) {
        return getPage2()
    }

    function getPage1() {
        return (
            <div className='flex flex-col w-full text-center items-center'>
                <div className='flex flex-col-2 m-5 items-center gap-56'>
                    <img width={200} height={200} src={"/VariablesBook/hokie-bird-148.png"} alt='Image of Hokie Bird holding 148th birthday sign.' />
                    <CodeSnippet code={p1Code} />
                </div>
                <MultipleChoiceQuestion question={q1.question} answers={q1.answers} style={Styles.HORIZONTAL} setCorrect={setQ1Correct} />
            </div>
        );
    }

    function getPage2() {
        return (
            <div className='flex flex-col w-full text-center items-center'>
                <div className='flex flex-col-2 m-5 items-center gap-56'>
                    <img width={200} height={200} src={"/VariablesBook/hokie-bird-148.png"} alt='Image of Hokie Bird holding 148th birthday sign.' />
                    <CodeSnippet code={p2Code} />
                </div>
                <MultipleChoiceQuestion question={q2.question} answers={q2.answers} style={Styles.HORIZONTAL} setCorrect={setQ2Correct} />
            </div>
        );
    }
}