"use client"
import React, { useState } from "react";
import Image from "next/image";

interface HokieBirdColorState {
    head: string,
    body: string,
    legs: string
}

const availableColors = ["red", "orange", "green", "maroon", "gold"]
const availableParts = ["head", "body", "legs"]

export function HokieBirdColoring({ props }: { props: any }) {
    const [colors, setColors] = useState({
        head: "",
        body: "",
        legs: ""
    });

    const [part, setPart] = useState(["","",""]);

    function HokieBirdColors() {
        
        const handlePart = (index: number, e: { target: { value: string; }; }) => {
            const updateParts = [...part];
            updateParts[index] = e.target.value.toLowerCase()
            setPart(updateParts)
        }

        function handleOnSubmitColor(e: React.KeyboardEvent<HTMLInputElement>, part: string) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const val = e.currentTarget.value.toLowerCase();
                if (availableColors.includes(val)) {
                    const temp = colors[part as keyof HokieBirdColorState] = val
                    const newColors = {
                        ...colors,
                        temp
                    }
                    setColors(newColors);
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
            <div className="flex flex-col flex-grow mx-10">
                <h1 style={{ fontWeight: 'bold' }}>{props.command}</h1>
                <div className="flex flex-row flex-grow ms-2" style={{ marginRight: '16px' }}>
                    <div className="flex flex-col flex-grow ms-2">
                        {availableParts.map((availablePart, index) => (
                            <div
                                key={`partText${index}`}
                                onDrop={(e) => handleOnDrop(e, availablePart)}
                                onDragOver={(e) => handleDragOver(e)}
                                className="flex flex-col flex-grow outline-black mt-6 outline-dotted text-center"
                            >
                                <label htmlFor={`${part}Text`}>
                                {props?.typeVariable ? (
                                    <input
                                        key={`${part}Text1`}
                                        type="text"
                                        className="rounded ml-4"
                                        style={{ width: '100px' }}
                                        placeholder="Part"
                                        onBlur={(e) => handlePart(index, e)}
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
                                    className="rounded ml-4"
                                    style={{ width: '100px' }}
                                    placeholder="Color"
                                    onKeyDown={(e) => handleOnSubmitColor(e, props?.typeVariable ? part[index] : availablePart)}
                                    defaultValue={props?.typeVariable ? colors[part[index] as keyof HokieBirdColorState] : colors[availablePart as keyof HokieBirdColorState]}
                                    disabled={!props.type}
                                />
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col mt-6" style={{ marginLeft: '16px' }}>
                        Option:
                        <div className="flex flex-row mt-6">
                            {props?.typeVariable ? (
                            <div className="flex flex-col flex-grow justify-around" style={{ marginRight: '8px' }}>
                                {availableParts.map((part, index) => (
                                <div key={`option${index}`} className="mb-2">{part}</div>
                                ))}
                            </div>
                            ) : (
                            ''
                            )}
                            <div className="flex flex-col flex-grow justify-around" style={{ marginLeft: '8px' }}>
                                <div draggable={props.draggable} className="flex text-red-600 mb-2" onDragStart={(e) => handleOnDrag(e, "red")}>red</div>
                                <div draggable={props.draggable} className="flex text-orange-600 mb-2" onDragStart={(e) => handleOnDrag(e, "orange")}>orange</div>
                                <div draggable={props.draggable} className="flex text-green-700 mb-2" onDragStart={(e) => handleOnDrag(e, "green")}>green</div>
                                <div draggable={props.draggable} className="flex text-maroon mb-2" onDragStart={(e) => handleOnDrag(e, "maroon")}>maroon</div>
                                <div draggable={props.draggable} className="flex text-yellow-500 mb-2" onDragStart={(e) => handleOnDrag(e, "gold")}>gold</div>  
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
                <Image src="/HokieBird.png" alt="book image" className={'center-left'} width={220} height={500}/>
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
