"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import { MultipleChoiceQuestion, Styles } from '../Question';
import { CodeSnippet } from '../CodeSnippet';
import { Type, TypeStyle } from '../TypeStyle';
import { VariablesQuestions } from '../../util/QuestionBank';

export interface IIntsAndBoolsProps {
    pageNumber: number
}

export function IntsAndBools({ props, setAllowNext }: { props: any | IIntsAndBoolsProps, setAllowNext: React.Dispatch<React.SetStateAction<boolean>> }) {

    const p2Code = <p>hokies_score = <TypeStyle text='38' style={Type.INTEGER}/><br/>syracuse_score = <TypeStyle text='10' style={Type.INTEGER}/><br/>win = hokies_score &gt; syracuse_score</p>
    
    const q1 = VariablesQuestions["IntsAndBoolsQ1"]
    const q2 = VariablesQuestions["IntsAndBoolsQ2"]

    const [q1ChosenAnswer, setQ1ChosenAnswer] = useState("?")
    const [dataTypeStyle, setDataTypeStyle] = useState(Type.INTEGER)

    const [q1Correct, setQ1Correct] = useState(false)
    const [q2Correct, setQ2Correct] = useState(false)

    useEffect(() => {
        if(props.pageNumber === 1) {
            setAllowNext(q1Correct)
        } else if(props.pageNumber === 2) {
            setAllowNext(q2Correct)
        }
    }, [q1Correct, q2Correct, props.pageNumber, setAllowNext])


    function q1ButtonPressed(button: HTMLButtonElement) {
        if(button.textContent !== null) {
            setQ1ChosenAnswer(button.textContent)
            switch (button.textContent) {
                case "False":
                    setDataTypeStyle(Type.BOOLEAN)
                    break;
                case "10":
                    setDataTypeStyle(Type.INTEGER)
                    break;
                case "'38'":
                    setDataTypeStyle(Type.STRING)
                    break;
                // case "38":
                //     setDataTypeStyle(Type.INTEGER)
                default:
            }
        }
    }

    if(props.pageNumber === 1) {
        return getPage1()
    } else if(props.pageNumber === 2) {
        return getPage2()
    }


    function getPage1() {
        return(
            <div className='flex flex-col w-full text-center items-center'>
                <img className='m-10' width={350} height={350} src={"/VariablesBook/vt_syracuse_score.png"} alt='Image of football score between Virginia Tech and Syracuse' />
                <div className='mb-5'>
                    <CodeSnippet code={<p>hokies_score = <TypeStyle text={q1ChosenAnswer} style={dataTypeStyle}/></p>}/>
                </div>
                <MultipleChoiceQuestion question={q1.question} answers={q1.answers} style={Styles.HORIZONTAL} setCorrect={setQ1Correct} buttonPressed={q1ButtonPressed}/>
            </div>
        );
    }


    function getPage2() {
        return(
            <div className='flex flex-col w-full text-center items-center'>
                <img className='m-10' width={350} height={350} src={"/VariablesBook/vt_syracuse_score.png"} alt='Image of football score between Virginia Tech and Syracuse' />
                <div className='mb-5'><CodeSnippet code={p2Code}/></div>
                <MultipleChoiceQuestion question={q2.question} answers={q2.answers} style={Styles.HORIZONTAL} setCorrect={setQ2Correct}/>
            </div>
        );
    }

}