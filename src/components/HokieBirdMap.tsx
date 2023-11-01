"use client"
import React, { ChangeEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";


interface HokieBirdColorState {
    images: string[]
    ans: string[]
}

const actions = ["turn_left()", "turn_right()", "move(2)", "move(3)", "move(4)"]

export function HokieBirdMap({ props }: { props: any }) {
    const blankProcedures = props.ans.map((statement: string) => { return "" })

    const [errorProcedure, setErrorProcedure] = useState<number | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const [currentImage, setCurrentImage] = useState(props.images[0]);
    const [procedures, setProcedures] = useState<string[]>(blankProcedures)

    const router = useRouter()

    function handleOnDragStatement(e: React.DragEvent, statement: string) {
        e.dataTransfer.setData("statement", statement);
    }

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault()
    }

    function handleOnDropStatement(e: React.DragEvent, statementNumber: number) {
        const statement = e.dataTransfer.getData("statement") as string;
        console.log(statementNumber)
        setProcedure(statementNumber, statement)

    }

    function runProcedure() {
        setMessage("So far so good! Keep going!")
        for (let i = 0; i < procedures.length; i++) {
            if (procedures[i] !== props.ans[i]) {
                console.log(`Error at ${i} ${procedures[i]} ${props.ans[i]}`)
                if (procedures[i] == "") { setMessage(`Keep going! Your're almost there!`) } else { setMessage(`Almost! Try again, ${procedures[i]} is not the right statement.`) }
                setCurrentImage(props.images[i])
                setErrorProcedure(i)
                break
            }
            if (i === procedures.length - 1) {
                setMessage("You did it!")
                setCurrentImage(props.images[procedures.length])
                router.push(`/book/${props.bookID}/${props.pageNum + 1}`)
            }
        }
    }

    function setProcedure(index: number, statement: string) {
        const newProcedures = [...procedures]
        newProcedures[index] = statement
        setProcedures(newProcedures)
    }

    function resetAll() {
        setProcedures(blankProcedures);
        setMessage(null);
        setErrorProcedure(null);
        setCurrentImage(props.images[0]);
        router.push(`/book/${props.bookID}/${2}`);
    }

    return (
        <div className="flex flex-col items-center">
            <Image className="" src={`/Maze/${currentImage}`} width={400} height={400} alt="Hokie Bird Maze Image" />
            <div className="grid grid-cols-2 gap-4 px-4">
                <div>
                    {procedures.map((statement, index) => {
                        return (
                            <div key={index} className="flex flex-row items-center space-x-1 p-0.5">
                                <div className="w-10 px-2">{index + 1}.</div>
                                <div className="flex flex-col rounded-full" onDrop={(e) => handleOnDropStatement(e, index)} onDragOver={(e) => handleDragOver(e)}>
                                    <input type="text" className={`rounded-2xl text-center  border-2 ${errorProcedure === index ? "border-red-500" : ""} ${procedures[index] !== "" ? "bg-blue-200" : ""}`}
                                        placeholder={props?.type ? "Type Here" : "Drag Statement Here"} disabled={!props.type} defaultValue={statement} onChange={(e) => setProcedure(index, e.target.value)} />
                                </div>
                                <button className="bg-red-200 rounded-2xl hover:shadow-2xl px-1" onClick={() => {
                                    setProcedure(index, "")
                                }}>Reset</button>
                                {errorProcedure === index && <div className="text-red-500">x</div>}

                            </div>
                        )
                    })}
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex flex-wrap p-2">
                        {actions.map((action: string, i: number) => (
                            <div key={i} className="p-1 hover:shadow-2xl">
                                <div draggable={props.draggable} className="text-black bg-blue-200 rounded-2xl px-2" onDragStart={(e) => handleOnDragStatement(e, action)}>
                                    {action}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-row space-x-2">
                        <button className="p-4 bg-green-200 rounded-2xl hover:shadow-2xl" onClick={() => {
                            runProcedure()
                        }}>Run</button>
                        <button className="p-4 bg-red-200 rounded-2xl hover:shadow-2xl" onClick={() => resetAll()}>Reset All</button>
                    </div>
                    <div className="p-4">
                        {message && <div className={`p-4 bg-blue-200 rounded-2xl`}>{message}</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}