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

    return (
        <div className="flex flex-col">
            <Image src={`/Maze/${props?.image}`} width={700} height={500} alt="Hokie Bird Maze Image"></Image>
            {!props.finished &&
                <div className="p-4 object-center place-self-center">
                    <div className="flex flex-col p-6 rounded-full" onDrop={(e) => handleOnDropStatement(e, "statement")} onDragOver={(e) => handleDragOver(e)}>
                        <input type="text" className="rounded-2xl p-4 bg-gray-300 text-center" placeholder={props?.type ? "Type Here" : "Drag Statement Here"} disabled={!props.type} defaultValue={game.statement} onChange={(e) => handleInputChangeStatement(e)} />
                    </div>
                </div>
            }
            {!props.finished &&
                <div className="py-2">
                    <div className="flex flex-col flex-grow">
                        <div className="flex flex-row flex-grow justify-around ">
                            {
                                actions.map((action: string, i: number) => (
                                    <div key={`mapActivity-${i}`} draggable={props.draggable} className="flex text-red-600" style={{ color: "white", cursor: "pointer", borderRadius: "3px", padding: "3px 5px", background: "rgb(160, 160, 220)" }} onDragStart={(e) => handleOnDragStatement(e, action)}>{action}</div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex flex-col flex-grow justify-between ml-4">
                        {good ?
                            <Link href={`/book/${props.bookID}/${props.pageNum + 1}`} className="rounded bg-green-500 text-center mx-5 mb-5 mt-5">
                                <button onClick={e => checkAnswers()} >Run</button>
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                                    <span className="block sm:inline">Correct! click Run button to continue</span>
                                </div>
                            </Link> :
                            wrong ?
                                <Link href={`/book/${props.bookID}/${props.pageNum}`} className="rounded bg-green-500 text-center mx-5 mb-5 mt-5">
                                    <button onClick={e => checkAnswers()}>Run</button>
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-10 py-3 rounded relative" role="alert">
                                        <span className="block sm:inline">That is not quite correct, click the Reset button to try again!</span>
                                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                            <button onClick={e => handleResetMaze(e)}><svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg></button>
                                        </span>
                                    </div>
                                </Link> :
                                <button className="rounded bg-green-500 text-center mx-5 mb-5 mt-5" onClick={e => checkAnswers()}>Run</button>
                        }
                        <button className="rounded bg-red-500 mx-5 hover:shadow-2xl" onClick={e => handleResetMaze(e)}>Reset</button>
                    </div>

                </div>
            }
        </div>
    )
}