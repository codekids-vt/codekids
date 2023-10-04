"use client"
import React, { useState} from "react";
import { useRouter } from 'next/router'
import Link from "next/link";

interface HokieBirdColorState {
    condition: string,
    statement1: string,
    statement2: string
}


export function HokieBirdMap({ props }: { props: any}) {

    // const router = useRouter()
    const [game, setGame] = useState({
        condition: "",
        statement1: "",
        statement2: ""
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

        
    function handleOnDropCondition (e: React.DragEvent, part: string) {
        const condition = e.dataTransfer.getData("condition") as string;
        setGame({
            ...game,
            condition: condition
        })
    }

    function handleOnDropStatement (e: React.DragEvent, statementNumber: string) {
        const statement = e.dataTransfer.getData("statement") as string;
        const temp = game[statementNumber as keyof HokieBirdColorState] =  statement
        const newColors = {
            ...game,
            temp
        }
        setGame(newColors);
    }

    function handleResetMaze() {
        setGame({
            condition: "",
            statement1: "",
            statement2: ""
        })
    }

    function checkAnswers(){
        // router.push(`book/3/${props.pageNum++}`)
    }

    console.log(props.finished)
    return (
        <div className="flex flex-col flex-grow justify-between">
            <img src={`/Maze/${props?.image}`} width={400} height={300}></img>
            { !props.finished && 
            <div className="flex flex-row">
                <div>
                    <div className="flex flex-col" onDrop={(e) => handleOnDropCondition(e, "condition")} onDragOver={(e) => handleDragOver(e)}>
                        <label htmlFor="ifCondition" className="flex flex-grow"> If (
                            <input key={"ifCondition"} type="text" className="rounded" placeholder={props?.type ? "Type Here" : "Drag Condition Here"} disabled={!props.type} defaultValue={game.condition}/>
                        ):
                        </label> 
                    </div>
                    <div className="flex flex-col" onDrop={(e) => handleOnDropStatement(e, "statement1")} onDragOver={(e) => handleDragOver(e)}>
                        <label htmlFor="ifConditionStatement1" className="flex flex-grow ml-5 mt-5"> 
                            <input key={"ifConditionStatement1"} type="text" className="rounded" placeholder={props?.type ? "Type Here" : "Drag Statement Here"} disabled={!props.type} defaultValue={game.statement1}/> 
                        </label>
                    </div>
                    {/* <div className="flex flex-col" onDrop={(e) => handleOnDropStatement(e, "statement2")} onDragOver={(e) => handleDragOver(e)}>
                        <label htmlFor="ifConditionStatement2" className="flex flex-grow mt-5"/>else: 
                        <input key={"ifConditionStatement2"} type="text" className="rounded ml-5" placeholder={props?.type ? "Type Here" : "Drag Statement Here"} disabled={!props.type} defaultValue={game.statement2}/> 
                    </div> */}
                </div>
                <div className="flex flex-col flex-grow justify-between ml-4">
                    <Link href={`/book/3/${props.pageNum+1}`}> 
                    <button className="rounded bg-green-500" onClick={e => checkAnswers()}>Run</button>
                    </Link>
                    <button className="rounded bg-red-500" onClick={e => handleResetMaze()}>Reset</button>
                </div>
            </div>
            }
            { !props.finished &&  
            <div className="mb-36">
                <div className="flex flex-col flex-grow">
                    <div className="flex flex-row flex-grow justify-around">
                        <div draggable={props.draggable} className="flex text-red-600" onDragStart={(e) => handleOnDragStatement(e, "hokieBird.move()")}>hokieBird.move()</div>
                        <div draggable={props.draggable} className="flex text-red-600" onDragStart={(e) => handleOnDragStatement(e, "hokieBird.turnRight()")}>hokieBird.turnRight()</div>
                        <div draggable={props.draggable} className="flex text-red-600" onDragStart={(e) => handleOnDragStatement(e, "hokieBurd.turnLeft()")}>hokieBurd.turnLeft()</div>
                    </div>
                    <div className="flex flex-row flex-grow justify-around">
                        <div draggable={props.draggable} className="flex text-blue-600 ml-2" onDragStart={(e) => handleOnDragCondition(e, "hokieBirdCanMove()")}>hokieBirdCanMove()</div>
                        <div draggable={props.draggable} className="flex text-blue-600 ml-2" onDragStart={(e) => handleOnDragCondition(e, "canHokieBirdTurnRight()")}>canHokieBirdTurnRight()</div>
                        <div draggable={props.draggable} className="flex text-blue-600 ml-2" onDragStart={(e) => handleOnDragCondition(e, "canHokieBirdTurnLeft()")}>canHokieBirdTurnLeft()</div>
                    </div>
                </div>
            </div>
            }
            
        </div>
    )
}