import React, { useState } from 'react';
import { Reader } from '../../Reader';
import { GetWindowScale } from '../GetWindowScale';
import Image from 'next/image'
import { CodeStep } from '../../CodeStep';

export function GoatsForLoopCodeStep({setAllowNext} : {setAllowNext: React.Dispatch<React.SetStateAction<boolean>>}) {
    
    const windowScale = GetWindowScale()

    const [currentLine, setCurrentLine] = useState(0)
    const [currentImage, setCurrentImage] = useState("/LoopsBook/BabyGoats/for_loop_baby_goats.svg")
    const [loopIteration, setLoopIteration] = useState("")
    const [walkthroughText, setWalkthroughText] = useState("Click next and watch the for loop execute.")

    const code = "# cup_number is currently " + loopIteration + "\n \nfor cup_number in range(0, 5):\n\tprint(\"Fed baby goats a cup!\")\n \n#End of program"

    React.useEffect(() => {
        setAllowNext(currentLine === 5)
        if(currentLine === 0) {
            setCurrentImage("/LoopsBook/BabyGoats/for_loop_baby_goats.svg")
            setWalkthroughText("Click next and watch the for loop execute.")
        } else if(currentLine === 2 && loopIteration === "") {
            setCurrentImage("/LoopsBook/BabyGoats/for_loop_baby_goats_1.svg")
            setWalkthroughText("The loop begins and will execute as long as cup_number is in range(0, 5).")
        } else if(currentLine === 2) {
            setCurrentImage("/LoopsBook/BabyGoats/for_loop_baby_goats_3.svg")
            setWalkthroughText("The arrow is followed back up to the beginning of the loop.")
        } else if(currentLine === 3) {
            setCurrentImage("/LoopsBook/BabyGoats/for_loop_baby_goats_2.svg")
            setWalkthroughText("cup_number is " + loopIteration + " which is in range(0, 5). So, the True arrow will be followed.")
        } else if (currentLine === 5) {
            setCurrentImage("/LoopsBook/BabyGoats/for_loop_baby_goats_4.svg")
            setWalkthroughText("cup_number would become 5 which is not in range(0, 5). So, the False arrow is followed.")
        }
    }, [loopIteration, currentLine, setAllowNext])

    const getLine = (lineNumber: number) => {
        setCurrentLine(lineNumber)
    }

    const getIteration = (iteration: number) => {
        if(iteration-1 === -1) {
            setLoopIteration("")
            return
        }
        setLoopIteration((iteration - 1).toString())
    }

    return(
        <div className='flex flex-col gap-5 text-center' style={{zoom: windowScale}}>
            <div className='flex gap-5'>
                <div className='flex flex-col w-1/2 justify-center'>
                    <CodeStep props={{code: code, skipLines: [1,4], enableNext: true, getLine: getLine}} loop={{exists: true, lines: [2, 3], times: 5, getIteration: getIteration}}/>
                </div>
                <img width={800} height={800} src={currentImage} alt='Flow chart'/>
            </div>
            <Reader text={walkthroughText}/>
        </div>
    );
}