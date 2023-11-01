"use client"
import React, { ChangeEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface HokieBirdColorState {
    //condition: string,
    statement: string,
    // statement2: string
}

const actions = ["turn_left", "turn_right", "move_2", "move_3", "move_4"]

export function HokieBirdMap({ props }: { props: any }) {
    const [good, setGood] = useState(false)
    const [wrong, setWrong] = useState(false)
    const [currentImage, setCurrentImage] = useState(props.image);
    const [game, setGame] = useState({
        condition: "",
        statement: "",
    });

    function handleOnDragStatement(e: React.DragEvent, statement: string) {
        e.dataTransfer.setData("statement", statement);
    }

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault()
    }

    function handleOnDropStatement(e: React.DragEvent, statementNumber: string) {
        const statement = e.dataTransfer.getData("statement") as string;
        const temp = game[statementNumber as keyof HokieBirdColorState] = statement
        const newColors = {
            ...game,
            temp
        }
        setGame(newColors);
        setGood(newColors.statement === props.ans.statement);
        setCurrentImage(newColors.statement === props.ans ? props.ans_image : props.image)
        setWrong(newColors.statement !== props.ans)

    }

    function handleResetMaze(e: any) {
        setGame({
            condition: "",
            statement: "",
        })
        setCurrentImage(props.image);
        setWrong(false);
        setGood(false);
    }

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

    const runButton = <button className="rounded-2xl bg-primary-green text-center p-3 hover:shadow-2xl" onClick={e => checkAnswers()}>Run</button>

    return (
        <div className="flex flex-col items-center">
            <Image className="" src={`/Maze/${props?.image}`} width={400} height={400} alt="Hokie Bird Maze Image" />
            {!props.finished &&
                <div className="p-4 object-center place-self-center">
                    <div className="flex flex-col p-6 rounded-full" onDrop={(e) => handleOnDropStatement(e, "statement")} onDragOver={(e) => handleDragOver(e)}>
                        <input type="text" className="rounded-2xl p-4 bg-gray-300 text-center" placeholder={props?.type ? "Type Here" : "Drag Statement Here"} disabled={!props.type} defaultValue={game.statement} onChange={(e) => handleInputChangeStatement(e)} />
                    </div>
                </div>
            }
            {!props.finished &&
                <div className="py-2">
                    <div className="flex flex-row justify-center">
                        {actions.map((action: string, i: number) => (
                            <div className="p-2">
                                <div key={`mapActivity-${i}`} draggable={props.draggable} className="text-black bg-primary-green hover:shadow-2xl rounded-2xl p-3" onDragStart={(e) => handleOnDragStatement(e, action)}>
                                    {action}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col items-center space-y-4">
                        {good ?
                            <Link href={`/book/${props.bookID}/${props.pageNum + 1}`} className="rounded bg-primary-green text-center">
                                {runButton}
                                <div className="bg-green-100 border border-primary-green text-primary-green px-4 py-3 rounded relative" role="alert">
                                    <span className="block sm:inline">Correct! click Run button to continue</span>
                                </div>
                            </Link> :
                            wrong ?
                                <Link href={`/book/${props.bookID}/${props.pageNum}`} className="rounded-2xl p-2 bg-primary-green text-center">
                                    {runButton}
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-10 py-3 rounded relative" role="alert">
                                        <span className="block sm:inline">That is not quite correct, click the Reset button to try again!</span>
                                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                            <button onClick={e => handleResetMaze(e)}><svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg></button>
                                        </span>
                                    </div>
                                </Link> : runButton
                        }
                        <button className="rounded-2xl p-3 bg-red-500 hover:shadow-2xl" onClick={e => handleResetMaze(e)}>Reset</button>
                    </div>

                </div>
            }
        </div>
    )
}