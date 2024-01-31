import React, { Dispatch, SetStateAction, useState } from 'react'
import Image from 'next/image'
import { CodeSnippet } from '../CodeSnippet'
import { Answer, Question, Styles } from '../Question'


export interface IStringsProps {
    pageNumber: number
}

export function Strings({ props, setAllowNext }: { props: any | IStringsProps, setAllowNext: Dispatch<SetStateAction<boolean>> }) {

    const q1Answers: Answer[] = [
        {
            answerText: "Integer",
            answerExplanation: "Incorrect. Notice that all of the values are surrounded by single or double quotation marks. Also remember an integer is a whole number. Try again!",
            correct: false
        },
        {
            answerText: "Boolean",
            answerExplanation: "Incorrect. Notice that all of the values are surrounded by single or double quotation marks. Also remember a Boolean is always True or False. Try again!",
            correct: false
        },
        {
            answerText: "String",
            answerExplanation: "Correct! All the values are surrounded by single or double quotation marks. This means they are Strings!",
            correct: true
        },
        {
            answerText: "None",
            answerExplanation: "Incorrect. Notice that all of the values are surrounded by single or double quotation marks. Also it's impossible for a variable to not have a data type. Try again!",
            correct: false
        }
    ]

    const q2Answers : Answer[] = [
        {
            answerText: '"Derek"',
            answerExplanation: "Incorrect. Remember the quotation marks are not printed when a String is printed. Try again!",
            correct: false
        },
        {
            answerText: "Epcot",
            answerExplanation: "Incorrect. therapy_dog_left is what's being printed. Try Again!",
            correct: false
        },
        {
            answerText: "Josie",
            answerExplanation: "Incorrect. therapy_dog_left is what's being printed. Try Again!",
            correct: false
        },
        {
            answerText: "Derek",
            answerExplanation: "Correct! The quotation marks are not printed when printing a String.",
            correct: true
        }
    ]

    const q3Answers : Answer[] = [
        {
            answerText: "Boolean",
            answerExplanation: "Incorrect. Remember a Boolean can only be True or False. Try again!",
            correct: false
        },
        {
            answerText : "String",
            answerExplanation: "Incorrect. Remember a string is always surrounded by single or double quotation marks. Try again!",
            correct: false
        },
        {
            answerText: "Integer",
            answerExplanation: "Correct! anniversary is assigned 147 which is an integer.",
            correct: true
        },
        {
            answerText: "None",
            answerExplanation: "Incorrect. It's impossible for a variable to not have a data type. Try again!",
            correct: false
        }
    ]

    const q4Answers : Answer[] = [
        {
            answerText: "Boolean",
            answerExplanation: "Incorrect. Remember a Boolean can only be True or False. Try again!",
            correct: false
        },
        {
            answerText: "String",
            answerExplanation: "Correct! Even though 148 is a number, it's surrounded by double quotation marks. So, it's a String!",
            correct: true
        },
        {
            answerText: "Integer",
            answerExplanation: "Incorrect. 148 is a number, however, notice that it's surrounded by double quotation marks. Try again!",
            correct: false
        },
        {
            answerText: "None",
            answerExplanation: "Incorrect. It's impossible for a variable to not have a data type. Try again!",
            correct: false
        }
    ]

    const q5Answers : Answer[] = [
        {
            answerText: "A year has passed!\n148",
            answerExplanation: "Incorrect. Pay close attention to what's in the final print statement. Try again!",
            correct: false
        },
        {
            answerText: "A year has passed!\nanniversary_2",
            answerExplanation: "Correct! In the last print statement, it prints 'anniversary_2' which is a string. Not the variable anniversary_2",
            correct: true
        },
        {
            answerText: "A year has passed!\n\"148\"",
            answerExplanation: "Incorrect. Pay close attention to what's in the final print statement and remember printing a string doesn't include the quotation marks. Try again!",
            correct: false
        }
    ]

    const p1Code = <p>
                        therapy_dog_left = <span style={code_string_style}>{'"Derek"'}</span><br/>
                        therapy_dog_middle = <span style={code_string_style}>{"'Epcot'"}</span><br/>
                        therapy_dog_right = <span style={code_string_style}>{'"Josie"'}</span>
                    </p>

    const p2Code = <p>
                        therapy_dog_left = <span style={code_string_style}>{'"Derek"'}</span><br/>
                        therapy_dog_middle = <span style={code_string_style}>{"'Epcot'"}</span><br/>
                        therapy_dog_right = <span style={code_string_style}>{'"Josie"'}</span><br/>
                        print(therapy_dog_left)
                    </p>

    const p3Code = <p>
                        anniversary = <span style={code_integer_style}>147</span><br/>
                        {'print("A year has passed!")'}<br/>
                        anniversary_2 = <span style={code_string_style}>{'"148"'}</span><br/>
                        print(<span style={code_string_style}>{"'anniversary_2'"}</span>)
                    </p>

    const p4Code = <p>
                        anniversary = <span style={code_integer_style}>147</span><br/>
                        {'print("A year has passed!")'}<br/>
                        anniversary_2 = <span style={code_string_style}>{'"148"'}</span><br/>
                        print(<span style={code_string_style}>{"'anniversary_2'"}</span>)
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

    if(props.pageNumber === 1) {
        return getPage1()
    } else if (props.pageNumber === 2) {
        return getPage2()
    } else if( props.pageNumber == 3) {
        return getPage3()
    } else if (props.pageNumber === 4) {
        return getPage4()
    }


    function getPage1()
    {
        return (
            <div className='flex flex-col w-full text-center items-center'>
                <Image className='mb-5' width={300} height={300} src={"/VariablesBook/therapy_dogs.png"} alt='Image of Virginia Tech therapy dogs.'/>
                <CodeSnippet code={p1Code}/>
                <Question question='What is the data type of the previous code?' answers={q1Answers} style={Styles.HORIZONTAL} setCorrect={setQ1Correct}/>
            </div>
        );
    }

    function getPage2() {
        return (
            <div className='flex flex-col w-full text-center items-center'>
                <Image className='mb-5' width={300} height={300} src={"/VariablesBook/therapy_dogs.png"} alt='Image of Virginia Tech therapy dogs.'/>
                <CodeSnippet code={p2Code}/>
                <Question question='What is printed at the end of this program?' answers={q2Answers} style={Styles.HORIZONTAL} setCorrect={setQ2Correct}/>
            </div>
        );
    }


    function getPage3() {
        return (
            <div className='flex flex-col w-full text-center items-center'>
                <div className='flex flex-col-2 m-5 items-center gap-56'>
                    <Image width={200} height={200} src={"/VariablesBook/hokie-bird-148.png"} alt='Image of Hokie Bird holding 148th birthday sign.'/>
                    <CodeSnippet code={p3Code}/>
                </div>
                <div className='mb-5'><Question question='What is the data type of anniversary?' answers={q3Answers} style={Styles.HORIZONTAL} setCorrect={setQ3Correct}/></div>
                <Question question='What is the data type of anniversary_2?' answers={q4Answers} style={Styles.HORIZONTAL} setCorrect={setQ4Correct}/>
            </div>
        );
    }

    function getPage4() {
        return (
            <div className='flex flex-col w-full text-center items-center'>
                <div className='flex flex-col-2 m-5 items-center gap-56'>
                        <Image width={200} height={200} src={"/VariablesBook/hokie-bird-148.png"} alt='Image of Hokie Bird holding 148th birthday sign.'/>
                        <CodeSnippet code={p4Code}/>
                </div>
                <Question question='What is printed during this program?' answers={q5Answers} style={Styles.HORIZONTAL} setCorrect={setQ5Correct}/>
            </div>
        );
    }

}

const code_string_style = {
    color: "#b87554"
}

const code_integer_style = {
    color: "#ff6371"
}