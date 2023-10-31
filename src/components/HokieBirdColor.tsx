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
    const [part, setPart] = useState(["", "", ""]);
    const [colors, setColors] = useState({
        head: "",
        body: "",
        legs: ""
    });

    function HokieBirdColors() {

        const handlePart = (index: number, value: string) => {
            const val = value.toLowerCase();
            if (availableParts.includes(val)) {
                const updatedParts = [...part];
                updatedParts[index] = val;
                setPart(updatedParts);
            } else if (availableColors.includes(val)) {
                alert('This value is a color, not a body part!');
            }
        }

        const handleColorChange = (part: string, value: string) => {
            const val = value.toLowerCase();
            if (availableParts.includes(val)) {
                alert('This value is a body part, not a color!');
            }
            if (value.startsWith('"') && value.endsWith('"')) {
                const strippedValue = val.substring(1, val.length - 1);
                if (availableColors.includes(strippedValue) && part != '') {
                    setColors((prevColors) => ({
                        ...prevColors,
                        [part]: strippedValue,
                    }));
                } else if (availableParts.includes(strippedValue)) {
                    alert('This value is a body part, not a color!');
                }
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
                <h1 className="font-bold text-center">{props.command}</h1>
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
                                        defaultValue={
                                            props?.typeVariable ? 
                                                (colors[part[index] as keyof HokieBirdColorState] ? `"${colors[part[index] as keyof HokieBirdColorState]}"` : '') 
                                                : (colors[availablePart as keyof HokieBirdColorState] ? `"${colors[availablePart as keyof HokieBirdColorState]}"` : '')}
                                        disabled={!props.type}
                                    />
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col px-2">
                        <h1 className="font-bold text-center">Options:</h1>
                        <div className={`${props?.typeVariable ? "grid-cols-2" : "grid-cols-1"} grid gap-x-4 gap-y-4`}>
                            {props?.typeVariable && (
                                <div className="flex flex-col flex-grow space-y-2">
                                    {availableParts.map((part, index) => (
                                        <div 
                                            key={`option${index}`} 
                                            className="flex p-3 min-w-[70px] place-content-center rounded-2xl bg-gray-300">
                                                {part}
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="flex flex-col flex-grow space-y-2">
                                {availableColors.map((color, index) => (
                                    <div 
                                        key={index} 
                                        draggable={props.draggable} 
                                        className={`flex ${availableColorsTailwind[color]} p-3 min-w-[70px] place-content-center rounded-2xl shadow-2xl`} 
                                        onDragStart={(e) => handleOnDrag(e, color)}
                                    >
                                        <q className="text-white">{color}</q>
                                    </div>
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
