import React, { useState } from 'react';
import { Reader } from '../../Reader';
import { GetWindowScale } from '../GetWindowScale';
import Image from 'next/image'
import { number } from 'yup';
import { set } from 'react-hook-form';

export interface IForLoopDragActivityProps {
    pageNumber: number
}

export function ForLoopTypeActivity({props, setAllowNext} : {props: IForLoopDragActivityProps | any, setAllowNext: React.Dispatch<React.SetStateAction<boolean>>}) {

    const windowScale = GetWindowScale()

    /*
        State for page 1
    */
    const [answerSelected, setAnswerSelected] = useState("")
    const [answerSelectedList, setAnswerSelectedList] = useState(["bg-orange-300", "bg-orange-300", "bg-orange-300"])
    const [itVarTyped, setItVarTyped] = useState("")
    const [itObjTyped, setItObjTyped] = useState("")
    const [q1AnswerExplanation, setQ1AnswerExplanation] = useState("Type in your answers above and then click submit!")
    const [q1Correct, setQ1Correct] = useState(false)

    const iterator_variable_blank = <input id='it-var' onClick={(e) => blankPressed(e.currentTarget)} className='px-1 bg-orange-100 hover:bg-orange-50 w-28 text-lg' type='text' value={itVarTyped} onChange={(e) => {setItVarTyped(e.target.value)}}/>
    const iterator_object = <input id='it-obj' onClick={(e) => blankPressed(e.currentTarget)} className='px-1 bg-orange-100 hover:bg-orange-50 w-28 text-lg' type='text' value={itObjTyped} onChange={(e) => {setItObjTyped(e.target.value)}}/>

    /*
        State for page 2
    */
    const [answerSelected_p2, setAnswerSelected_p2] = useState("")
    const [answerSelectedList_p2, setAnswerSelectedList_p2] = useState(["bg-orange-300", "bg-orange-300"])
    const [itVarTyped_p2, setItVarTyped_p2] = useState("")
    const [itObjTyped_p2, setItObjTyped_p2] = useState("")
    const [q2AnswerExplanation, setQ2AnswerExplanation] = useState("Type in your answers above and then click submit!")
    const [q2Correct, setQ2Correct] = useState(false)
    
    const iterator_variable_blank_p2 = <input id='it-var_p2' onClick={(e) => blankPressed_p2(e.currentTarget)} className='px-1 bg-orange-100 hover:bg-orange-50 w-28 text-lg' type='text' value={itVarTyped_p2} onChange={(e) => {setItVarTyped(e.target.value)}}/>
    const iterator_object_p2 = <input id='it-obj_p2' onClick={(e) => blankPressed_p2(e.currentTarget)} className='px-1 bg-orange-100 hover:bg-orange-50 w-28 text-lg' type='text' value={itObjTyped_p2} onChange={(e) => {setItObjTyped(e.target.value)}}/>

    React.useEffect(() => {
        if(props.pageNumber === 1){
            setAllowNext(q1Correct)
        } else if (props.pageNumber === 2) {
            setAllowNext(q2Correct)
        }
    }, [q1Correct, q2Correct, setAllowNext])
    
    if(props.pageNumber === 1) {
        return getPage1()
    } else if (props.pageNumber === 2) {
        return getPage2()
    }

    function resetPressed() {
        setItVarTyped("")
        setItObjTyped("")
        setAnswerSelected("")
        setAnswerSelectedList(["bg-orange-300", "bg-orange-300", "bg-orange-300"])
        setQ1AnswerExplanation("Type in your answers above and then click submit!")
    }

    function submitPressed() {
        const varTyped = itVarTyped.replace(/\s/g, "")
        const objTyped = itObjTyped.replace(/\s/g, "")
        if(varTyped === "lap_number" && objTyped === "range(0,3)") {
            setQ1AnswerExplanation("Correct! The iterator variable is lap_number and iterator object is range(0, 3)")
            setQ1Correct(true)
        } else if(varTyped === "" && objTyped === "") {
            setQ1AnswerExplanation("Please type in or copy an answer for the iterator variable and iterable object.")
        } else {
            setQ1AnswerExplanation("Incorrect. Remember the iterator variable is simply a variable name and range() gives an iterable object.")
        }
    }

    function answerPressed(e: EventTarget & HTMLButtonElement) {
        var newSelected = ["bg-orange-300", "bg-orange-300", "bg-orange-300"]
        if(answerSelectedList[parseInt(e.id)] === "bg-orange-400") {
            setAnswerSelected("")
            setAnswerSelectedList(newSelected)
            return
        }
        if(e.textContent !== null) {
            setAnswerSelected(e.textContent)
            newSelected[parseInt(e.id)] = "bg-orange-400"
            setAnswerSelectedList(newSelected)
        }
    }

    function blankPressed(e: EventTarget & HTMLInputElement) {
        if(answerSelected === "") return
        if(e.id === "it-var") {
            setItVarTyped(answerSelected)
        } else if (e.id === "it-obj") {
            setItObjTyped(answerSelected)
        }
        setAnswerSelected("")
        setAnswerSelectedList(["bg-orange-300", "bg-orange-300", "bg-orange-300"])
    }

    function getPage1() {
        return(
            <div className='flex flex-col gap-10 text-center items-center w-full p-5' style={{zoom: windowScale}}>
                <Image width={500} height={500} src={"/LoopsBook/riding_2.jpg"} alt='Image of people riding pony'/>
                <div className='flex gap-10 items-center w-full'>
                    <div className='flex flex-col w-1/2 gap-5 w-1/2'>
                        <div style={text_style}><Reader text='Make the For-loop execute 3 times for each lap of pony riding!'/></div>
                        <div style={text_style}><Reader text='Type in the iterator variable and iterator object from the given options!'/></div>
                        <div style={text_style}><Reader text='You can also click an answer choice and a text input to copy it in.'/></div>
                    </div>
                    <div className='flex flex-col gap-5 items-center w-1/2'>
                        <div className='bg-orange-300 border-2 rounded-md border-black p-10 text-left whitespace-pre-wrap'>
                            {"for "}{iterator_variable_blank}{" in "}{iterator_object}{":\n\tprint('Fed baby goats one cup!')"}
                        </div>
                        <div className='flex gap-10'>
                            <button id='0' className={answerSelectedList[0]} style={answer_button_style} type='button' onClick={(e) => answerPressed(e.currentTarget)}>lap_number</button>
                            <button id='1' className={answerSelectedList[1]} style={answer_button_style} type='button' onClick={(e) => answerPressed(e.currentTarget)}>range(0, 3)</button>
                            <button id="2" className={answerSelectedList[2]} style={answer_button_style} type='button' onClick={(e) => answerPressed(e.currentTarget)}>range(0, 5)</button>
                        </div>
                        <div className='flex gap-10'>
                            <button className='bg-red-400 py-3 px-10 border-2 border-gray-500 rounded-md' type='button' onClick={() => resetPressed()}>Reset</button>
                            <button className='bg-green-400 py-3 px-10 border-2 border-gray-500 rounded-md' type='button' onClick={() => submitPressed()}>Submit</button>
                        </div>
                        <Reader text={q1AnswerExplanation}/>
                    </div>
                </div>
            </div>
        );
    }

    function resetPressed_p2() {
        setItVarTyped_p2("")
        setItObjTyped_p2("")
        setAnswerSelected_p2("")
        setAnswerSelectedList_p2(["bg-orange-300", "bg-orange-300"])
        setQ2AnswerExplanation("Type in your answers above and then click submit!")
    }

    function submitPressed_p2() {
        const varTyped = itVarTyped_p2.replace(/\s/g, "")
        const objTyped = itObjTyped_p2.replace(/\s/g, "")
        if(varTyped === "lap_number" && objTyped === "range(0,3)") {
            setQ2AnswerExplanation("Correct! The iterator variable is lap_number and the iterator object is range(0, 3)")
            setQ2Correct(true)
        } else if(varTyped === "" && objTyped === "") {
            setQ2AnswerExplanation("Please type in or copy an answer for the iterator variable and iterable object.")
        } else {
            setQ2AnswerExplanation("Incorrect. Remember the iterator variable is simply a variable name and range() gives an iterable object.")
        }
    }

    function answerPressed_p2(e: EventTarget & HTMLButtonElement) {
        var newSelected = ["bg-orange-300", "bg-orange-300"]
        if(answerSelectedList[parseInt(e.id)] === "bg-orange-400") {
            setAnswerSelected_p2("")
            setAnswerSelectedList_p2(newSelected)
            return
        }
        if(e.textContent !== null) {
            setAnswerSelected_p2(e.textContent)
            newSelected[parseInt(e.id)] = "bg-orange-400"
            setAnswerSelectedList_p2(newSelected)
        }
    }

    function blankPressed_p2(e: EventTarget & HTMLInputElement) {
        if(answerSelected_p2 === "") return
        if(e.id === "it-var_p2") {
            setItVarTyped_p2(answerSelected_p2)
        } else if (e.id === "it-obj_p2") {
            setItObjTyped_p2(answerSelected_p2)
        }
        setAnswerSelected_p2("")
        setAnswerSelectedList_p2(["bg-orange-300", "bg-orange-300"])
    }



    function getPage2() {
        return(
            <div className='flex flex-col gap-10 text-center items-center w-full p-5' style={{zoom: windowScale}}>
                <Image width={500} height={500} src={"/LoopsBook/riding_2.jpg"} alt='Image of people riding pony'/>
                <div className='flex gap-10 items-center w-full'>
                    <div className='flex flex-col gap-5 w-1/2'>
                        <div style={text_style}><Reader text='Type in what the iterator variable and iterable object are from the given options.'/></div>
                        <div style={text_style}><Reader text='You can type the answer or click on an answer choice to copy it into the blank.'/></div>
                    </div>
                    <div className='flex flex-col gap-5 items-center w-1/2'>
                        <div className='bg-orange-300 border-2 rounded-md border-black p-10 text-left whitespace-pre-wrap'>
                            {"Iterator Variable:\t"}{iterator_variable_blank_p2}{"\n\nIterable Object:\t\t"}{iterator_object_p2}
                        </div>
                        <div className='flex gap-10'>
                            <button id='0' className={answerSelectedList_p2[0]} style={answer_button_style} type='button' onClick={(e) => answerPressed_p2(e.currentTarget)}>range(0, 3)</button>
                            <button id='1' className={answerSelectedList_p2[1]} style={answer_button_style} type='button' onClick={(e) => answerPressed_p2(e.currentTarget)}>lap_number</button>
                        </div>
                        <div className='flex gap-10'>
                            <button className='bg-red-400 py-3 px-10 border-2 border-gray-500 rounded-md' type='button' onClick={() => resetPressed_p2()}>Reset</button>
                            <button className='bg-green-400 py-3 px-10 border-2 border-gray-500 rounded-md' type='button' onClick={() => submitPressed_p2()}>Submit</button>
                        </div>
                        <Reader text={q2AnswerExplanation}/>
                    </div>
                </div>
                
                
            </div>
        );
    }

}

const text_style = {
    fontWeight: "600",
    fontSize: "1.5rem",
    lineHeight: "2rem",
    textAlign: "center" as "center"
}

const answer_button_style = {
    color: "black",
    fontSize: "20px",
    border: "1px solid grey",
    borderRadius: "10px",
    padding: "10px",
    cursor: "pointer",
    whiteSpace: "pre-wrap" as "pre-wrap"
}