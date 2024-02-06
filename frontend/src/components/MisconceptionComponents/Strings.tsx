import React, { Dispatch, SetStateAction, useState } from 'react'
import Image from 'next/image'
import { CodeSnippet } from '../CodeSnippet'
import { MultipleChoiceQuestion, Styles } from '../Question'
import { TypeStyle, Type } from '../TypeStyle'
import { VariablesQuestions } from '../../util/QuestionBank'


export interface IStringsProps {
    pageNumber: number
}

export function Strings({ props, setAllowNext }: { props: any | IStringsProps, setAllowNext: Dispatch<SetStateAction<boolean>> }) {

    const q1 = VariablesQuestions["StringsQ1"]
    const q2 = VariablesQuestions["StringsQ2"]
    const q3 = VariablesQuestions["StringsQ3"]
    const q4 = VariablesQuestions["StringsQ4"]
    const q5 = VariablesQuestions["StringsQ5"]

    const p1Code = <p>
        therapy_dog_left = <TypeStyle text='"Derek"' style={Type.STRING} /><br />
        therapy_dog_middle = <TypeStyle text="'Epcot'" style={Type.STRING} /><br />
        therapy_dog_right = <TypeStyle text='"Josie"' style={Type.STRING} />
    </p>

    const p2Code = <p>
        therapy_dog_left = <TypeStyle text='"Derek"' style={Type.STRING} /><br />
        therapy_dog_middle = <TypeStyle text="'Epcot'" style={Type.STRING} /><br />
        therapy_dog_right = <TypeStyle text='"Josie"' style={Type.STRING} /><br />
        print(therapy_dog_left)
    </p>

    const p3Code = <p>
        anniversary = <TypeStyle text='147' style={Type.INTEGER} /><br />
        {'print("A year has passed!")'}<br />
        anniversary_2 = <TypeStyle text='"148"' style={Type.STRING} /><br />
        print(<TypeStyle text="'anniversary_2'" style={Type.STRING} />)
    </p>

    const p4Code = <p>
        anniversary = <TypeStyle text='147' style={Type.INTEGER} /><br />
        {'print("A year has passed!")'}<br />
        anniversary_2 = <TypeStyle text='"148"' style={Type.STRING} /><br />
        print(<TypeStyle text="'anniversary_2'" style={Type.STRING} />)
    </p>


    const [q1Correct, setQ1Correct] = useState(false)
    const [q2Correct, setQ2Correct] = useState(false)
    const [q3Correct, setQ3Correct] = useState(false)
    const [q4Correct, setQ4Correct] = useState(false)
    const [q5Correct, setQ5Correct] = useState(false)

    React.useEffect(() => {
        if (props.pageNumber === 1) {
            setAllowNext(q1Correct)
        } else if (props.pageNumber === 2) {
            setAllowNext(q2Correct)
        } else if (props.pageNumber === 3) {
            setAllowNext(q3Correct && q4Correct)
        } else if (props.pageNumber === 4) {
            setAllowNext(q5Correct)
        }

    }, [q1Correct, q2Correct, q3Correct, q4Correct, q5Correct, props.pageNumber, setAllowNext])

    if (props.pageNumber === 1) {
        return getPage1()
    } else if (props.pageNumber === 2) {
        return getPage2()
    } else if (props.pageNumber == 3) {
        return getPage3()
    } else {
        return getPage4()
    }


    function getPage1() {
        return (
            <div className='flex flex-col w-full text-center items-center gap-3'>
                <img className='mb-5' width={300} height={300} src={"/VariablesBook/therapy_dogs.png"} alt='Image of Virginia Tech therapy dogs.' />
                <CodeSnippet code={p1Code} />
                <MultipleChoiceQuestion question={q1.question} answers={q1.answers} style={Styles.HORIZONTAL} setCorrect={setQ1Correct} />
            </div>
        );
    }

    function getPage2() {
        return (
            <div className='flex flex-col w-full text-center items-center gap-3'>
                <img className='mb-5' width={300} height={300} src={"/VariablesBook/therapy_dogs.png"} alt='Image of Virginia Tech therapy dogs.' />
                <CodeSnippet code={p2Code} />
                <MultipleChoiceQuestion question={q2.question} answers={q2.answers} style={Styles.HORIZONTAL} setCorrect={setQ2Correct} />
            </div>
        );
    }


    function getPage3() {
        return (
            <div className='flex flex-col w-full text-center items-center gap-3'>
                <div className='flex flex-col-2 m-5 items-center gap-56'>
                    <img width={200} height={200} src={"/VariablesBook/hokie-bird-148.png"} alt='Image of Hokie Bird holding 148th birthday sign.' />
                    <CodeSnippet code={p3Code} />
                </div>
                <div className='mb-5'><MultipleChoiceQuestion question={q3.question} answers={q3.answers} style={Styles.HORIZONTAL} setCorrect={setQ3Correct} /></div>
                <MultipleChoiceQuestion question={q4.question} answers={q4.answers} style={Styles.HORIZONTAL} setCorrect={setQ4Correct} />
            </div>
        );
    }

    function getPage4() {
        return (
            <div className='flex flex-col w-full text-center items-center gap-3'>
                <div className='flex flex-col-2 m-5 items-center gap-56'>
                    <img width={200} height={200} src={"/VariablesBook/hokie-bird-148.png"} alt='Image of Hokie Bird holding 148th birthday sign.' />
                    <CodeSnippet code={p4Code} />
                </div>
                <MultipleChoiceQuestion question={q5.question} answers={q5.answers} style={Styles.HORIZONTAL} setCorrect={setQ5Correct} />
            </div>
        );
    }

}