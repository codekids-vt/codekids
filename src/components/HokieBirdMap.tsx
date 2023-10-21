"use client"
import React, { ChangeEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface HokieBirdColorState {
    condition: string,
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

    function handleOnDragCondition(e: React.DragEvent, condition: string) {
        e.dataTransfer.setData("condition", condition);
    }

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault()
    }


    function handleOnDropCondition(e: React.DragEvent, part: string) {
        const condition = e.dataTransfer.getData("condition") as string;
        setGame({
            ...game,
            condition: condition
        })
        setGood(condition === props.ans?.condition && game.statement === props.ans?.statement);
    }

    function handleOnDropStatement(e: React.DragEvent, statementNumber: string) {
        const statement = e.dataTransfer.getData("statement") as string;
        const temp = game[statementNumber as keyof HokieBirdColorState] = statement
        const newColors = {
            ...game,
            temp
        }
        setGame(newColors);
        setGood(newColors.condition === props.ans.condition && newColors.statement === props.ans.statement);

    }


    function handleResetMaze() {
        setGame({
            condition: "",
            statement: "",
        })
    }

    function handleInputChangeCondition(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const val = e.currentTarget.value as string
        setGame({
            condition: val,
            statement: game.statement
        });
        console.log("here")
        setGood(val === props.ans?.condition && game.statement === props.ans?.statement);
    }

    function handleInputChangeStatement(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const val = e.currentTarget.value as string
        setGame({
            condition: game.condition,
            statement: val
        });
        setGood(game.condition === props.ans?.condition && val === props.ans?.statement);
    }

    function checkAnswers() {
        console.log(game)
        console.log(good)
        setGood(game.condition === props.ans?.condition && game.statement === props.ans?.statement);
    }

    return (
        <div className="flex flex-col flex-grow justify-between">
            <Image src={`/Maze/${props?.image}`} width={400} height={500} alt="Hokie Bird Maze Image"></Image>
            {!props.finished &&
                <div className="flex flex-row">
                    <div>
                        <div className="flex flex-col" onDrop={(e) => handleOnDropCondition(e, "condition")} onDragOver={(e) => handleDragOver(e)}>
                            <label htmlFor="ifCondition" className="flex flex-grow"> If (
                                <input key={"ifCondition"} type="text" className="rounded" placeholder={props?.type ? "Type Here" : "Drag Condition Here"} disabled={!props.type} defaultValue={game.condition} onChange={(e) => handleInputChangeCondition(e)} />
                                ):
                            </label>
                        </div>
                        <div className="flex flex-col" onDrop={(e) => handleOnDropStatement(e, "statement")} onDragOver={(e) => handleDragOver(e)}>
                            <label htmlFor="ifConditionStatement1" className="flex flex-grow ml-5 mt-5">
                                <input key={"ifConditionStatement1"} type="text" className="rounded" placeholder={props?.type ? "Type Here" : "Drag Statement Here"} disabled={!props.type} defaultValue={game.statement} onChange={(e) => handleInputChangeStatement(e)} />
                            </label>
                        </div>
                        {/* <div className="flex flex-col" onDrop={(e) => handleOnDropStatement(e, "statement2")} onDragOver={(e) => handleDragOver(e)}>
                        <label htmlFor="ifConditionStatement2" className="flex flex-grow mt-5"/>else: 
                        <input key={"ifConditionStatement2"} type="text" className="rounded ml-5" placeholder={props?.type ? "Type Here" : "Drag Statement Here"} disabled={!props.type} defaultValue={game.statement2}/> 
                    </div> */}
                    </div>
                    <div className="flex flex-col flex-grow justify-between ml-4">
                        {good ?
                            <Link href={`/book/${props.bookID}/${props.pageNum + 1}`} className="rounded bg-green-500 text-center">
                                <button onClick={e => checkAnswers()}>Run</button>
                            </Link> :
                            <button className="rounded bg-green-500 text-center" onClick={e => checkAnswers()}>Run</button>
                        }
                        <button className="rounded bg-red-500" onClick={e => handleResetMaze()}>Reset</button>
                    </div>
                </div>
            }
            {!props.finished &&
                <div className="mb-36">
                    <div className="flex flex-col flex-grow">
                        <div className="flex flex-row flex-grow justify-around">
                            <div draggable={props.draggable} className="flex text-red-600" onDragStart={(e) => handleOnDragStatement(e, "hokieBird.turnLeft()")}>hokieBurd.turnLeft()</div>
                            <div draggable={props.draggable} className="flex text-red-600" onDragStart={(e) => handleOnDragStatement(e, "hokieBird.move()")}>hokieBird.move()</div>
                            <div draggable={props.draggable} className="flex text-red-600" onDragStart={(e) => handleOnDragStatement(e, "hokieBird.turnRight()")}>hokieBird.turnRight()</div>
                        </div>
                        <div className="flex flex-row flex-grow justify-around">
                            <div draggable={props.draggable} className="flex text-blue-600 ml-2" onDragStart={(e) => handleOnDragCondition(e, "canHokieBirdTurnRight()")}>canHokieBirdTurnRight()</div>
                            <div draggable={props.draggable} className="flex text-blue-600 ml-2" onDragStart={(e) => handleOnDragCondition(e, "canHokieBirdTurnLeft()")}>canHokieBirdTurnLeft()</div>
                            <div draggable={props.draggable} className="flex text-blue-600 ml-2" onDragStart={(e) => handleOnDragCondition(e, "hokieBirdCanMove()")}>hokieBirdCanMove()</div>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}