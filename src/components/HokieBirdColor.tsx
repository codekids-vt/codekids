"use client"
import React, { useState } from "react";
import Image from "next/image";

interface HokieBirdColorState {
    head: string,
    body: string,
    legs: string
}

const availableColors = ["red", "orange", "green", "maroon", "gold"]
const availableColorsTailwind: { [key: string]: string } = {
    red: "bg-red-600",
    orange: "bg-orange-600",
    green: "bg-green-700",
    maroon: "bg-maroon",
    gold: "bg-yellow-500"
}
const availableParts = ["head", "body", "legs"]

export function HokieBirdColoring({ props }: { props: any }) {
    const [colors, setColors] = useState({
        head: "",
        body: "",
        legs: ""
    });

    const [part, setPart] = useState(["", "", ""]);

    function HokieBirdColors() {

        const handlePart = (index: number, value: string) => {
            const val = value.toLowerCase();
            if (availableParts.includes(val)) {
                const updatedParts = [...part];
                updatedParts[index] = val;
                setPart(updatedParts);
            }
        }

        const handleColorChange = (part: string, value: string) => {
            const val = value.toLowerCase();
            if (availableColors.includes(val) && part != '') {
                setColors((prevColors) => ({
                    ...prevColors,
                    [part]: val,
                }));
            }
        }

        function handleOnDrop(e: React.DragEvent, part: string) {
            const color = e.dataTransfer.getData("Color") as string;
            const temp = colors[part as keyof HokieBirdColorState] = color
            const newColors = {
                ...colors,
                temp
            }
            setColors(newColors);
        }

        function handleDragOver(e: React.DragEvent) {
            e.preventDefault()
        }


        function handleOnDrag(e: React.DragEvent, color: string) {
            e.dataTransfer.setData("Color", color);
        }

        return (
            <div className="flex flex-col p-5 bg-gray-200 rounded-2xl">
                <h1 className="font-bold">{props.command}</h1>
                <div className="flex flex-row p-4">
                    <div className="flex flex-col p-2 space-y-2">
                        {availableParts.map((availablePart, index) => (
                            <div
                                key={`partText${index}`}
                                onDrop={(e) => handleOnDrop(e, availablePart)}
                                onDragOver={(e) => handleDragOver(e)}
                                className="outline-black p-2 rounded-2xl outline-dotted text-center"
                            >
                                <label htmlFor={`${part}Text`}>
                                    {props?.typeVariable ? (
                                        <input
                                            key={`${part}Text1`}
                                            className={`rounded w-36 animate-pulse bg-yellow-50`}
                                            type="text"
                                            placeholder="Type a body part"
                                            onChange={(e) => handlePart(index, e.target.value)}
                                            defaultValue={part[index]}
                                            disabled={!props.type}
                                        />
                                    ) : (
                                    `${availablePart}`
                                    )}
                                    {' = '}
                                    <input
                                        key={`${part}Text2`}
                                        type="text"
                                        className={`rounded w-36 animate-pulse bg-yellow-50`}
                                        placeholder={props?.type ? "Type a color here" : "Drag a color here"}
                                        onChange={(e) => handleColorChange(props?.typeVariable ? part[index] : availablePart, e.target.value)}
                                        defaultValue={props?.typeVariable ? colors[part[index] as keyof HokieBirdColorState] : colors[availablePart as keyof HokieBirdColorState]}
                                        disabled={!props.type}
                                    />
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col px-2">
                        <h1 className="font-bold">Options</h1>
                        <div className="grid grid-cols-2 gap-2">
                            {props?.typeVariable && (
                                <div className="flex flex-col flex-grow space-y-2">
                                    {availableParts.map((part, index) => (
                                        <div key={`option${index}`} className="p-1 rounded-2xl bg-gray-300 text-center">{part}</div>
                                    ))}
                                </div>
                            )}
                            <div className="flex flex-col flex-grow space-y-2">
                                {availableColors.map((color, index) => (
                                    <div key={index} draggable={props.draggable} className={`flex ${availableColorsTailwind[color]} p-1 place-content-center rounded-2xl shadow-2xl`} onDragStart={(e) => handleOnDrag(e, color)}>{color}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function HokieBird() {
        return (
            <div className="flex flex-col flex-grow justify-center items-center mx-10">
                <Image src="/HokieBird.png" alt="book image" className={'center-left'} width={220} height={500} />
                <Image src="/HokieHead.png" alt="book image" className={`absolute center-left img-${colors.head} `} width={220} height={500} />
                <Image src="/HokieBody.png" alt="book image" className={`absolute center-left img-${colors.body} `} width={220} height={500} />
                <Image src="/HokieLegs.png" alt="book image" className={`absolute center-left img-${colors.legs} `} width={220} height={500} />
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            <HokieBird></HokieBird>
            <HokieBirdColors></HokieBirdColors>
        </div>
    )
}
