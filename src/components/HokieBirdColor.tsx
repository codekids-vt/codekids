import React, { useState} from "react";

interface HokieBirdColorState {
    head: string,
    body: string,
    legs: string
}

export const HokieBirdColoring = () => {

    const [colors, setColors] = useState({
        head: "transparent",
        body: "transparent",
        legs: "transparent"
    })

    
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

    const HokieBirdColors = () => {      
        return (
            <div className="flex flex-col flex-grow mx-10">
            {/* <div>Drag The Colors over thse boxes</div> */}
            <div className="flex flex-col flex-grow justify-center items-center">
                <div onDrop={(e) => handleOnDrop(e, "head")} onDragOver={(e) => handleDragOver(e)} className="flex outline-black outline-dotted">Hokie Head = 
                    <input type="text" className="rounded"></input>
                </div>
                <div onDrop={(e) => handleOnDrop(e, "body")} onDragOver={(e) => handleDragOver(e)} className="flex outline-black mt-6 outline-dotted text-center">Hokie Body = 
                    <input type="text" className="rounded"></input></div>
                <div onDrop={(e) => handleOnDrop(e, "legs")} onDragOver={(e) => handleDragOver(e)} className="flex outline-black mt-6 outline-dotted text-center">Hokie Legs = 
                    <input type="text" className="rounded"></input></div>
            </div>
            <div className="flex flex-row flex-grow justify-around">
                <div draggable className="flex text-red-600" onDragStart={(e) => handleOnDrag(e, "Red")}>Red</div>
                <div draggable className="flex text-orange-600" onDragStart={(e) => handleOnDrag(e, "Orange")}>Orange</div>
                <div draggable className="flex text-green-700" onDragStart={(e) => handleOnDrag(e, "Green")}>Green</div>
                <div draggable className="flex text-amber-950" onDragStart={(e) => handleOnDrag(e, "Maroon")}>Maroon</div>
                <div draggable className="flex text-orange-400" onDragStart={(e) => handleOnDrag(e, "Gold")}>Gold</div>
                
            </div>
          </div>
        )
    }


    const  HokieBird = () =>{
        const [good, setGood] = useState("img-transparent")
      
      
        const handleOnDrop = (e: React.DragEvent) => {
          const color = e.dataTransfer.getData("Color") as string;
          console.log( color)
          setGood(`img-${color}`)
        }
        
        function handleDragOver(e: React.DragEvent) {
          e.preventDefault()
          setGood("img-hover")
        }
      
        function dragLeaveHandler(e: React.DragEvent) {
          e.preventDefault();
          setGood("img-transparent")
        }
      
        return (
          <div className="flex flex-col flex-grow justify-center items-center mx-10" onDragOver={handleDragOver} onDrop={handleOnDrop} onDragLeave={ dragLeaveHandler }>
            <img src="/HokieBird.png" alt="book image" className={'absolute top-25 left-20'} width={175} height={500} />
            <img  src="/HokieHead.png" alt="book image" className={`absolute top-25 left-20 img-${colors.head} `} width={175} height={500} />
            <img src="/HokieBody.png" alt="book image" className={`absolute  top-25 left-20 img-${colors.body} `} width={175} height={500} />
            <img src="/HokieLegs.png" alt="book image" className={`absolute  top-25 left-20 img-${colors.legs} `} width={175} height={500} />
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
