"use client"
import React, { useState} from "react";
import Image from "next/image";

interface HokieBirdColorState {
    head: string,
    body: string,
    legs: string
}

const availableColors = ["red", "orange", "green", "maroon", "gold"]

export function HokieBirdColoring({ props }: { props: any}) {
    const [colors, setColors] = useState({
        head: "",
        body: "",
        legs: ""
    });
   
    function HokieBirdColors() {    

        function handleOnSubmitColor (e: React.KeyboardEvent<HTMLInputElement>, part: string) {
            if(e.key === 'Enter') {
                e.preventDefault();
                const val = e.currentTarget.value.toLowerCase();
                if (availableColors.includes(val)) {
                    const temp = colors[part as keyof HokieBirdColorState] =  val
                    const newColors = {
                        ...colors,
                        temp
                    }
                    setColors(newColors);
                }
            }
        }
    
        function handleOnDrop (e: React.DragEvent, part: string) {
            const color = e.dataTransfer.getData("Color") as string;
            const temp = colors[part as keyof HokieBirdColorState] =  color
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
            <div>Drag The Colors over thse boxes</div>
            <div className="flex flex-col flex-grow justify-center items-center">
                <div onDrop={(e) => handleOnDrop(e, "head")} onDragOver={(e) => handleDragOver(e)} className="flex outline-black outline-dotted">
                    <label htmlFor="headText"> Hokie Head = 
                        <input 
                        key={"headText"} type="text" 
                        className="rounded ml-4" 
                        placeholder={props?.type ? "Type Here" : "Drag Here"}  
                        onKeyDown={(e) => handleOnSubmitColor(e, "head")}
                        defaultValue={colors.head}
                        disabled={!props.type}
                        />
                    </label>
                </div>
                <div onDrop={(e) => handleOnDrop(e, "body")} onDragOver={(e) => handleDragOver(e)} className="flex outline-black mt-6 outline-dotted text-center" >
                <label htmlFor="bodyTex"> Hokie Body = 
                    <input key={"bodyTex"}  type="text" className="rounded ml-4" placeholder={props?.type ? "Type Here" : "Drag Here"}   defaultValue={colors.body} onKeyDown={(e) => handleOnSubmitColor(e, "body")} disabled={!props.type}/>
                </label>
                </div>
                <div onDrop={(e) => handleOnDrop(e, "legs")} onDragOver={(e) => handleDragOver(e)} className="flex outline-black mt-6 outline-dotted text-center">
                <label htmlFor="legsText"> Hokie Legs = 
                    <input key={"legsText"} type="text" className="rounded ml-4" placeholder={props?.type ? "Type Here" : "Drag Here"}   defaultValue={colors.legs} onKeyDown={(e) => handleOnSubmitColor(e, "legs")} disabled={!props.type}/>
                </label>
                </div>
            </div>
            <div className="flex flex-row flex-grow justify-around">
                <div draggable={props.draggable} className="flex text-red-600" onDragStart={(e) => handleOnDrag(e, "red")}>Red</div>
                <div draggable={props.draggable} className="flex text-orange-600" onDragStart={(e) => handleOnDrag(e, "orange")}>Orange</div>
                <div draggable={props.draggable} className="flex text-green-700" onDragStart={(e) => handleOnDrag(e, "green")}>Green</div>
                <div draggable={props.draggable} className="flex text-amber-950" onDragStart={(e) => handleOnDrag(e, "maroon")}>Maroon</div>
                <div draggable={props.draggable} className="flex text-orange-400" onDragStart={(e) => handleOnDrag(e, "gold")}>Gold</div>
                
            </div>
          </div>
        )
    }


    function HokieBird() {      
        return (
          <div className="flex flex-col flex-grow justify-center items-center mx-10">
            <Image src="/HokieBird.png" alt="book image" className={'absolute top-25 left-20'} width={175} height={500} />
            <Image  src="/HokieHead.png" alt="book image" className={`absolute top-25 left-20 img-${colors.head} `} width={175} height={500} />
            <Image src="/HokieBody.png" alt="book image" className={`absolute  top-25 left-20 img-${colors.body} `} width={175} height={500} />
            <Image src="/HokieLegs.png" alt="book image" className={`absolute  top-25 left-20 img-${colors.legs} `} width={175} height={500} />
          </div>
        )
      }

    return (
        <div className="flex flex-row flex-grow justify-between">
            <HokieBird></HokieBird>
            <HokieBirdColors></HokieBirdColors>
        </div>
    )
}
