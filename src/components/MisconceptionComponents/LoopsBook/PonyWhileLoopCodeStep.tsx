import React, { useState } from 'react';
import { Reader } from '../../Reader';
import { GetWindowScale } from '../GetWindowScale';
import Image from 'next/image'
import { CodeStep } from '../FlowchartsBook/CodeStep';

export function PonyWhileLoopCodeStep({setAllowNext} : {setAllowNext: React.Dispatch<React.SetStateAction<boolean>>}) {

    const windowScale = GetWindowScale()

    const [currentLine, setCurrentLine] = useState(0)
    const [currentImage, setCurrentImage] = useState("/LoopsBook/WhilePonyRiding/while_loop_pony_riding.svg")
    const [loopIteration, setLoopIteration] = useState("")
    const [walkthroughText, setWalkthroughText] = useState("Click next and watch the for loop execute.")
    const [lapNumber, setCupNumber] = useState(0)
    const [prevLine, setPrevLine] = useState(0)

    const code = "# lap_number is currently " + lapNumber + "\n \nlap_number = 0\nwhile lap_number < 3:\n\tprint('Completed a lap of pony riding!')\n\tlap_number = lap_number + 1\n \n#End of program"

    // Handle updating lap_number
    React.useEffect(() => {
        if(currentLine === 3 && loopIteration !== "" && prevLine > currentLine) {
            setCupNumber(parseInt(loopIteration) + 1)
        } else if(currentLine === 5 && prevLine === 3) {
            setCupNumber(lapNumber - 1)
        }
    }, [loopIteration, currentLine, setAllowNext])

    // Handle the current line the code is on
    React.useEffect(() => {
        setAllowNext(currentLine === 7)
        if(currentLine === 0) {
            setCurrentImage("/LoopsBook/WhilePonyRiding/while_loop_pony_riding.svg")
            setWalkthroughText("Click next and watch the while loop execute.")
        } else if(currentLine === 3 && lapNumber === 0) {
            setCurrentImage("/LoopsBook/WhilePonyRiding/while_loop_pony_riding_1.svg")
            setWalkthroughText("lap_number is initially set to 0 and the loop begins.")
        } else if(currentLine === 3) {
            setCurrentImage("/LoopsBook/WhilePonyRiding/while_loop_pony_riding_3.svg")
            setWalkthroughText("The code moves back up to the beginning of the loop and checks the condition.")
        } else if(currentLine === 4 || currentLine === 5) {
            setCurrentImage("/LoopsBook/WhilePonyRiding/while_loop_pony_riding_2.svg")
            setWalkthroughText("lap_number is less than 3 so the True arrow is followed and the loop executes.")
        } else if(currentLine === 7) {
            setCurrentImage("/LoopsBook/WhilePonyRiding/while_loop_pony_riding_4.svg")
            setWalkthroughText("lap_number is 3, which is not less than 3. So the False arrow is followed and the loop ends.")
        }
    }, [currentLine, lapNumber])

    const getLine = (lineNumber: number) => {
        setPrevLine(currentLine)
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
                    <CodeStep props={{code: code, skipLines: [1,6], enableNext: true, getLine: getLine}} loop={{exists: true, lines: [3, 4, 5], times: 3, getIteration: getIteration}}/>
                </div>
                <Image width={800} height={800} src={currentImage} alt='Flow chart'/>
            </div>
            <Reader text={walkthroughText}/>
        </div>
    );

}