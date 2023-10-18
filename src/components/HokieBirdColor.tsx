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

    const [parts, setParts] = useState(["", "", ""]);

    function HokieBirdColors() {

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
            <div> {props?.type ? (
                props.typeVariable
                ? "Type the Body Part and Colors over these boxes"
                : "Type the Colors over these boxes"
                ) : "Drag the Colors over these boxes"}
            </div> 
            <div className="flex flex-col flex-grow justify-center items-center">
                {props?.typeVariable? 
                    <>
                        {availableParts.map((part, index) => {
                            <div
                                onDrop={(e) => handleOnDrop(e, part)}
                                onDragOver={(e) => handleDragOver(e)}
                                className="flex outline-black mt-6 outline-dotted text-center"
                            >
                                <label htmlFor={`${part}Text`}>
                                    <input
                                        key={`${part}Text1`}
                                        type="text"
                                        className="rounded ml-4"
                                        style={{ width: '100px' }}
                                        placeholder="Body Part"
                                        onBlur={(e) => {
                                            setParts((prevParts) => {
                                                const newParts = [...prevParts];
                                                newParts[index] = e.target.value.toLowerCase();
                                                return newParts;
                                            });
                                        }}
                                        defaultValue={part}
                                        disabled={!props.type} />
                                    {' = '}
                                    <input
                                        key={`${part}Text2`}
                                        type="text"
                                        className="rounded ml-4"
                                        style={{ width: '100px' }}
                                        placeholder="Color"
                                        onKeyDown={(e) => handleOnSubmitColor(e, part)}
                                        defaultValue={colors[part as keyof HokieBirdColorState]}
                                        disabled={!props.type} 
                                    />
                                </label>
                            </div>
                        })}
                    </>
                    :
                    <>
                        <div
                            onDrop={(e) => handleOnDrop(e, "head")}
                            onDragOver={(e) => handleDragOver(e)}
                            className="flex outline-black mt-6 outline-dotted text-center">
                            <label htmlFor="headText">Hokie Head =
                                <input
                                    key={"headText"} 
                                    type="text"
                                    className="rounded ml-4"
                                    style={{ width: '100px' }}
                                    placeholder={props?.type ? "Type Here" : "Drag Here"}
                                    onKeyDown={(e) => handleOnSubmitColor(e, "head")}
                                    defaultValue={colors.head}
                                    disabled={!props.type} />
                            </label>
                        </div>
                        <div 
                            onDrop={(e) => handleOnDrop(e, "body")}
                            onDragOver={(e) => handleDragOver(e)}
                            className="flex outline-black mt-6 outline-dotted text-center">
                            <label htmlFor="bodyTex">Hokie Body =
                                <input
                                    key={"bodyTex"}
                                    type="text"
                                    className="rounded ml-4"
                                    style={{ width: '100px' }}
                                    placeholder={props?.type ? "Type Here" : "Drag Here"}
                                    defaultValue={colors.body}
                                    onKeyDown={(e) => handleOnSubmitColor(e, "body")}
                                    disabled={!props.type}
                                />
                            </label>
                        </div>
                        <div 
                            onDrop={(e) => handleOnDrop(e, "legs")} 
                            onDragOver={(e) => handleDragOver(e)} 
                            className="flex outline-black mt-6 outline-dotted text-center">
                            <label htmlFor="legsText">Hokie Legs = 
                                <input 
                                    key={"legsText"} 
                                    type="text"
                                    className="rounded ml-4"
                                    style={{ width: '100px' }}
                                    placeholder={props?.type ? "Type Here" : "Drag Here"}   
                                    defaultValue={colors.legs} onKeyDown={(e) => handleOnSubmitColor(e, "legs")} 
                                    disabled={!props.type}
                                />
                            </label>
                        </div>
                    </>
                }
            </div>
            <div
                className="flex flex-col mt-6">
                Option:
                {
                    props?.typeVariable? 
                    <div className="flex flex-row flex-grow justify-around">
                        <div>head</div>
                        <div>body</div>
                        <div>legs</div>
                    </div> : ""
                }
                <div className="flex flex-row flex-grow justify-around">
                    <div draggable={props.draggable} className="flex text-red-600"  onDragStart={(e) => handleOnDrag(e, "red")}>red</div>
                    <div draggable={props.draggable} className="flex text-orange-600" onDragStart={(e) => handleOnDrag(e, "orange")}>orange</div>
                    <div draggable={props.draggable} className="flex text-green-700" onDragStart={(e) => handleOnDrag(e, "green")}>green</div>
                    <div draggable={props.draggable} className="flex text-maroon" onDragStart={(e) => handleOnDrag(e, "maroon")}>maroon</div>
                    <div draggable={props.draggable} className="flex text-yellow-500" onDragStart={(e) => handleOnDrag(e, "gold")}>gold</div>  
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
