import React, { useState} from "react";

export const HokieBirdColoring = () => {

    const HokieBirdColors = () => {
        // var good = "img-transparent"
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
            <div className="flex flex-col flex-grow justify-center mx-10">
            <div>Drag The Colors over thse boxes</div>
            <div className="flex flex-col flex-grow justify-center items-center">
                <div className="flex outline-black outline-dotted">Hokie Head</div>
                <div className="flex outline-black mt-6 outline-dotted text-center">Hokie Body</div>
                <div className="flex outline-black mt-6 outline-dotted text-center">Hokie Legs</div>
            </div>
            <div className="flex flex-row flex-grow justify-around">
                <div className="flex text-red-600">Red</div>
                <div className="flex text-orange-600">Orange</div>
                <div className="flex text-green-700">Green</div>
                <div className="flex text-amber-950">Maroon</div>
                <div className="flex text-orange-400">Gold</div>
                
            </div>
          </div>
        )
    }


    const  HokieBird = () =>{
        // var good = "img-transparent"
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
            <img  src="/HokieHead.png" alt="book image" className={`absolute top-25 left-20 img-transparent `} width={175} height={500} />
            <img src="/HokieBody.png" alt="book image" className={'absolute  top-25 left-20 img-transparent '} width={175} height={500} />
            <img src="/HokieLegs.png" alt="book image" className={'absolute  top-25 left-20 img-transparent '} width={175} height={500} />
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
