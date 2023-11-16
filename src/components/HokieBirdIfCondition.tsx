"use client"
import React, { ChangeEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface HokieBirdColorState {
    condition: string,
    statement: string,
    // statement2: string
}


export function HokieBirdIfCondition({ props }: { props: any }) {
    const answer = props.ans[0]
    const [wrong, setWrong] = useState(false)
    const [good, setGood] = useState(false)
    const [currentImage, setCurrentImage] = useState(props.image);
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
        setGood(condition === props.ans?.condition && game.statement === answer);
    }

    function handleOnDropStatement(e: React.DragEvent, statementNumber: string) {
        const statement = e.dataTransfer.getData("statement") as string;
        const temp = game[statementNumber as keyof HokieBirdColorState] = statement
        const newColors = {
            ...game,
            temp
        }
        setGame(newColors);
        setGood(newColors.statement === answer);
        setCurrentImage(newColors.statement === answer ? props.ans_image : props.image)
        setWrong(newColors.statement !== answer)
    }


    function handleReset(e: any) {
        setGame({
            condition: "",
            statement: "",
        })
        setCurrentImage(props.image);
        setWrong(false);
        setGood(false);
    }

    function handleInputChangeCondition(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const val = e.currentTarget.value as string
        setGame({
            condition: val,
            statement: game.statement
        });
        setGood(val === answer);
    }

    function handleInputChangeStatement(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const val = e.currentTarget.value as string
        setGame({
            condition: game.condition,
            statement: val
        });
        setGood(val === answer);
    }

    return (
        <div className="flex flex-col items-center justify-between">
            <div className="flex flex-col items-center h-[300px] w-[300px] relative">
                <Image src={currentImage} width={250} height={250} alt="Hokie Bird Image" className="absolute rounded-2xl"></Image>
                {props?.effect &&
                    <Image src={props.effect} width={400} height={500} alt="Hokie Bird Image Effect" className="absolute "></Image>
                }
            </div>
            <div className="flex flex-row">
                <div className="p-2">
                    <div className="flex flex-col" onDrop={(e) => handleOnDropCondition(e, "condition")} onDragOver={(e) => handleDragOver(e)}>
                        <label htmlFor="ifCondition" className="flex flex-grow">
                            <p className="px-2"><strong>If</strong></p>
                            <input key={"ifCondition"} type="text" className="w-80 outline-black rounded-2xl outline-dotted text-center px-8" placeholder={props?.type ? "Type Here" : "Drag Condition Here"} disabled={!props.type} defaultValue={props.condition} onChange={(e) => handleInputChangeCondition(e)} />
                        </label>
                    </div>
                    <div className="flex flex-col" onDrop={(e) => handleOnDropStatement(e, "statement")} onDragOver={(e) => handleDragOver(e)}>
                        <label htmlFor="ifConditionStatement1" className="flex flex-grow p-2" />
                        <input key={"ifConditionStatement1"} type="text" className="w-80 outline-black rounded-2xl outline-dotted text-center" placeholder={props?.type ? "Type Here" : "Drag appropriate action here"} disabled={!props.type} defaultValue={game.statement} onChange={(e) => handleInputChangeStatement(e)} />
                    </div>
                </div>
                <div className="flex flex-col flex-grow justify-between p-1">
                    {props.statements.map((statement: string, i: number) => (
                        <div className="p-2" key={`ifActivity-${i}`}>
                            <div draggable={props.draggable}
                                className="flex p-1 bg-gray-300  rounded-xl text-blue-600 shadow-xl hover:shadow-2xl hover:bg-gray-400 hover:text-white"
                                onDragStart={(e) => handleOnDragStatement(e, statement)}>{statement}
                            </div>
                        </div>
                    ))}
                    <div className="flex flex-row flex-grow justify-around p-1">
                        <button className="p-1 rounded-full bg-red-500" onClick={e => handleReset(e)}>Reset</button>
                    </div>
                </div>
            </div>
            {wrong &&
                <div className="bg-red-100 border border-red-400 text-red-700 px-10 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">That is not quite correct, try again!</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <button onClick={e => handleReset(e)}><svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg></button>
                    </span>
                </div>
            }
            {good &&
                <div className="bg-green-100 border border-green-400 text-green-700 px-10 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">Correct! click next to continue</span>
                </div>
            }
        </div>
    )
}