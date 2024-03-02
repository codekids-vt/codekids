import React, { useState } from 'react';
import { Reader } from '../../Reader';
import { GetWindowScale } from '../GetWindowScale';
import { CodeStep } from '../../CodeStep';

export function GoatsWhileLoopCodeStep({setAllowNext} : {setAllowNext: React.Dispatch<React.SetStateAction<boolean>>}) {

    const windowScale = GetWindowScale()

    const [currentLine, setCurrentLine] = useState(0)
    const [currentImage, setCurrentImage] = useState("/LoopsBook/WhileBabyGoats/while_loop_baby_goats.svg")
    const [loopIteration, setLoopIteration] = useState("")
    const [walkthroughText, setWalkthroughText] = useState("Click next and watch the for loop execute.")
    const [cupNumber, setCupNumber] = useState(0)
    const [prevLine, setPrevLine] = useState(0)

    const code = "# cup_number is currently " + cupNumber + "\n \ncup_number = 0\nwhile cup_number < 5:\n\tprint('Fed baby goats one cup!')\n\tcup_number = cup_number + 1\n \n#End of program"

    // Handle updating cup_number
    React.useEffect(() => {
        if(currentLine === 3 && loopIteration !== "" && prevLine > currentLine) {
            setCupNumber(parseInt(loopIteration) + 1)
        } else if(currentLine === 5 && prevLine === 3) {
            setCupNumber(cupNumber - 1)
        }
    }, [loopIteration, currentLine, setAllowNext])

    // Handle the current line the code is on
    React.useEffect(() => {
        setAllowNext(currentLine === 7)
        if(currentLine === 0) {
            setCurrentImage("/LoopsBook/WhileBabyGoats/while_loop_baby_goats.svg")
            setWalkthroughText("Click next and watch the while loop execute.")
        } else if(currentLine === 3 && cupNumber === 0) {
            setCurrentImage("/LoopsBook/WhileBabyGoats/while_loop_baby_goats_1.svg")
            setWalkthroughText("cup_number is initially set to 0 and the loop begins.")
        } else if(currentLine === 3) {
            setCurrentImage("/LoopsBook/WhileBabyGoats/while_loop_baby_goats_3.svg")
            setWalkthroughText("The code moves back up to the beginning of the loop and checks the condition.")
        } else if(currentLine === 4 || currentLine === 5) {
            setCurrentImage("/LoopsBook/WhileBabyGoats/while_loop_baby_goats_2.svg")
            setWalkthroughText("cup_number is less than 5 so the True arrow is followed and the loop executes.")
        } else if(currentLine === 7) {
            setCurrentImage("/LoopsBook/WhileBabyGoats/while_loop_baby_goats_4.svg")
            setWalkthroughText("cup_number is 5, which is not less than 5. So the False arrow is followed and the loop ends.")
        }
    }, [currentLine, cupNumber])

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
                    <CodeStep props={{code: code, skipLines: [1,6], enableNext: true, getLine: getLine}} loop={{exists: true, lines: [3, 4, 5], times: 5, getIteration: getIteration}}/>
                </div>
                <img width={800} height={800} src={currentImage} alt='Flow chart'/>
            </div>
            <Reader text={walkthroughText}/>
        </div>
    );

}