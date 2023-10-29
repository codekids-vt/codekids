"use client"
import React, { ChangeEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface HokieBirdColorState {
    //condition: string,
    statement: string,
    // statement2: string
}


export function HokieBirdMap({ props }: { props: any }) {
    const [good, setGood] = useState(false)
    const [game, setGame] = useState({
        condition: "",
        statement: "",
    });

    function handleOnDragStatement(e: React.DragEvent, statement: string) {
        e.dataTransfer.setData("statement", statement);
    }

    {/*
    function handleOnDragCondition(e: React.DragEvent, condition: string) {
        e.dataTransfer.setData("condition", condition);
    }
    */}

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault()
    }

    {/*
    function handleOnDropCondition(e: React.DragEvent, part: string) {
        const condition = e.dataTransfer.getData("condition") as string;
        setGame({
            ...game,
            condition: condition
        })
        setGood(game.statement === props.ans?.statement);
    }
    */}

    function handleOnDropStatement(e: React.DragEvent, statementNumber: string) {
        const statement = e.dataTransfer.getData("statement") as string;
        const temp = game[statementNumber as keyof HokieBirdColorState] = statement
        const newColors = {
            ...game,
            temp
        }
        setGame(newColors);
        setGood(newColors.statement === props.ans.statement);

    }


    function handleResetMaze() {
        setGame({
            condition: "",
            statement: "",
        })
    }

    {/*
    function handleInputChangeCondition(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const val = e.currentTarget.value as string
        setGame({
            condition: val,
            statement: game.statement
        });
        setGood(game.statement === props.ans?.statement);
    }
    */}

    function handleInputChangeStatement(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const val = e.currentTarget.value as string
        setGame({
            condition: game.condition,
            statement: val
        });
        setGood(val === props.ans?.statement);
    }

    function checkAnswers() {
        setGood(game.statement === props.ans?.statement);
    }

    return (
        <div className="flex flex-col flex-grow justify-between">
            <Image src={`/Maze/${props?.image}`} width={400} height={500} alt="Hokie Bird Maze Image"></Image>
            {!props.finished &&
                <div className="flex flex-row">
                    <div>
                        {/*
                        <div className="flex flex-col" onDrop={(e) => handleOnDropCondition(e, "condition")} onDragOver={(e) => handleDragOver(e)}>
                            <label htmlFor="ifCondition" className="flex flex-grow"> <p style={{ backgroundColor:"rgb(240,240,240)" }} className="mr-4">If</p>
                                <input key={"ifCondition"} type="text" className="rounded" style={{ backgroundColor:"rgb(240,240,240)" }} placeholder={props?.type ? "Type Here" : "Drag Condition Here"} disabled={!props.type} defaultValue={game.condition} onChange={(e) => handleInputChangeCondition(e)} />

                            </label>
                        </div>
                        */}
                        <div className="flex flex-col" style={{background:"rgb(220,220,220)", padding:"10px"}} onDrop={(e) => handleOnDropStatement(e, "statement")} onDragOver={(e) => handleDragOver(e)}>
                            <label htmlFor="ifConditionStatement1" className="flex flex-grow ml-5 mt-5" style={{background:"rgb(220,220,220)"}}>
                                <input key={"ifConditionStatement1"} type="text" className="rounded" placeholder={props?.type ? "Type Here" : "Drag Statement Here"} disabled={!props.type} defaultValue={game.statement} onChange={(e) => handleInputChangeStatement(e)} />
                            </label>
                        </div>
                        {/* <div className="flex flex-col" onDrop={(e) => handleOnDropStatement(e, "statement2")} onDragOver={(e) => handleDragOver(e)}>
                        <label htmlFor="ifConditionStatement2" className="flex flex-grow mt-5"/>else: 
                        <input key={"ifConditionStatement2"} type="text" className="rounded ml-5" placeholder={props?.type ? "Type Here" : "Drag Statement Here"} disabled={!props.type} defaultValue={game.statement2}/> 
                    </div> */}
                    </div>
                </div>
            }
            {!props.finished &&
                <div className="mb-36 mt-10">
                    <div className="flex flex-col flex-grow">
                        <div className="flex flex-row flex-grow justify-around ">
                            <div draggable={props.draggable} className="flex text-red-600" style={{ color:"white" , cursor: "pointer", borderRadius: "3px", padding: "3px 5px" , background: "rgb(160, 160, 220)"}} onDragStart={(e) => handleOnDragStatement(e, "turn_left")}>turn left</div>
                            <div draggable={props.draggable} className="flex text-red-600" style={{ color:"white" , cursor: "pointer", borderRadius: "3px", padding: "3px 5px" , background: "rgb(160, 160, 220)"}} onDragStart={(e) => handleOnDragStatement(e, "turn_right")}>turn right</div>
                            <div draggable={props.draggable} className="flex text-red-600" style={{ color:"white" , cursor: "pointer", borderRadius: "3px", padding: "3px 5px" , background: "rgb(160, 160, 220)"}} onDragStart={(e) => handleOnDragStatement(e, "move_2")}>move 2</div>
                            <div draggable={props.draggable} className="flex text-red-600" style={{ color:"white" , cursor: "pointer", borderRadius: "3px", padding: "3px 5px" , background: "rgb(160, 160, 220)"}} onDragStart={(e) => handleOnDragStatement(e, "move_3")}>move 3</div>
                            <div draggable={props.draggable} className="flex text-red-600" style={{ color:"white" , cursor: "pointer", borderRadius: "3px", padding: "3px 5px" , background: "rgb(160, 160, 220)"}} onDragStart={(e) => handleOnDragStatement(e, "move_4")}>move 4</div>
                        </div>
                        {/*
                        <div className="flex flex-row flex-grow justify-around style={{font-color: green}}">
                            <div draggable={props.draggable} className="flex text-blue-600 ml-2" onDragStart={(e) => handleOnDragCondition(e, "can_turn_right")}>can_turn_right</div>
                            <div draggable={props.draggable} className="flex text-blue-600 ml-2" onDragStart={(e) => handleOnDragCondition(e, "can_turn_left")}>can_turn_left</div>
                            <div draggable={props.draggable} className="flex text-blue-600 ml-2" onDragStart={(e) => handleOnDragCondition(e, "can_move_forward")}>can_move_forward</div>
                        </div>
                        */}
                    </div>
                    <div className="flex flex-col flex-grow justify-between ml-4">
                        {good ?
                            <Link href={`/book/${props.bookID}/${props.pageNum + 1}`} className="rounded bg-green-500 text-center mx-5 mb-5 mt-5">
                                <button onClick={e => checkAnswers()}>Run</button>
                            </Link> :
                            <button className="rounded bg-green-500 text-center mx-5 mb-5 mt-5" onClick={e => checkAnswers()}>Run</button>
                        }
                        <button className="rounded bg-red-500 mx-5" onClick={e => handleResetMaze()}>Reset</button>
                    </div>
                </div>
            }
        </div>
    )
}