import React, { useState } from 'react'
import { Reader } from '../../Reader';
import { PythonTutor } from '../../PythonTutor'
import Image from 'next/image'
import { MultipleChoiceQuestion, Styles } from '../../Question';
import { LifeOfMooseQuestions } from '../../../util/QuestionBank';

export interface ILifeOfMooseProps {
    pageNumber: number
}

const border = "border-4 border-lime-300 p-4"

const code = "moose_name = 'Moose'\nprint(moose_name)\nmoose_birthday = '02/13/2012'\nprint(moose_birthday)\nmoose_color = 'cream'\nprint(moose_color)\n"
                + "moose_breed = 'Labrador Retriever'\nprint(moose_breed)"


export function LifeOfMoose({ props, setAllowNext }: { props: any | ILifeOfMooseProps, setAllowNext: React.Dispatch<React.SetStateAction<boolean>> }) {

    const q1 = LifeOfMooseQuestions["LifeOfMooseQ1"]
    const q2 = LifeOfMooseQuestions["LifeOfMooseQ2"]
    const q3 = LifeOfMooseQuestions["LifeOfMooseQ3"]
    const q4 = LifeOfMooseQuestions["LifeOfMooseQ4"]

    const [q1Correct, setQ1Correct] = useState(false)
    const [q2Correct, setQ2Correct] = useState(false)
    const [q3Correct, setQ3Correct] = useState(false)
    const [q4Correct, setQ4Correct] = useState(false)

    React.useEffect(() => {
        if (props.pageNumber === 2) {
            setAllowNext(q1Correct && q2Correct && q3Correct && q4Correct)
        }
    }, [q1Correct, q2Correct, q3Correct, q4Correct, props.pageNumber, setAllowNext])


    if(props.pageNumber === 1) {
        return getPage1()
    } else if (props.pageNumber === 2) {
        return getPage2()
    }

    function getPage1() {
        return (
            <div className='flex flex-col w-full h-full text-center items-center font-semibold text-lg text-center gap-3'>
                <img width={500} height={500} src={"/LifeOfMoose/moose_2.png"} alt='Image of Moose' />
                <Reader text='First look over the code and then answer the following questions!'/>
                <PythonTutor props={{code: code}}/>
            </div>
        );
    }

    function getPage2() {
        return (
            <div className='flex flex-col w-full h-full text-center items-center gap-5'>
                <PythonTutor props={{code: code}}/>
                <div className='grid grid-cols-2 grid-rows-2'>
                    <div className={border}><MultipleChoiceQuestion question={q1.question} answers={q1.answers} style={Styles.HORIZONTAL} setCorrect={setQ1Correct}/></div>
                    <div className={border}><MultipleChoiceQuestion question={q2.question} answers={q2.answers} style={Styles.HORIZONTAL} setCorrect={setQ2Correct}/></div>
                    <div className={border}><MultipleChoiceQuestion question={q3.question} answers={q3.answers} style={Styles.HORIZONTAL} setCorrect={setQ3Correct}/></div>
                    <div className={border}><MultipleChoiceQuestion question={q4.question} answers={q4.answers} style={Styles.HORIZONTAL} setCorrect={setQ4Correct}/></div>
                </div>
            </div>
        );
    }
    

}

