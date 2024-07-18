import React, { Dispatch, SetStateAction, useState } from 'react'
import { CodeStep } from './CodeStep';
import { Reader } from './Reader';

function CodeStepFlowchart({
    props,
    setAllowNext
} : {
    props: any;
    setAllowNext: Dispatch<SetStateAction<boolean>>;
}
) {

    const [currentLine, setCurrentLine] = useState(0)
    const [currentImage, setCurrentImage] = useState("")
    const [loopIteration, setLoopIteration] = useState("")
    const [walkthroughText, setWalkthroughText] = useState("")
    const [iteratorVariable, setIteratorVariable] = useState(0)
    const [prevLine, setPrevLine] = useState(0)

    const startLine = Math.min(...props.loop.lines)
    const endLine = Math.max(...props.loop.lines)

    console.log("LINES: ", startLine, endLine)

    const numOfLines = props.code.split("\n").length - 1

    React.useEffect(() => {
        if(currentLine === startLine && loopIteration !== "" && prevLine > currentLine) {
            setIteratorVariable(parseInt(loopIteration) + 1)
        } else if (currentLine === endLine && prevLine === startLine) {
            setIteratorVariable(iteratorVariable - 1)
        }
    }, [loopIteration, currentLine, setAllowNext])

    React.useEffect(() => {
        if(props.flowChart[currentLine] === undefined)
            return
        
        var {image, text} = props.flowChart[currentLine]

        // f is indication of first iteration
        if((`${currentLine}f` in props.flowChart) && loopIteration === "") {
            image = props.flowChart[`${currentLine}f`].image
            text = props.flowChart[`${currentLine}f`].text
        }

        setCurrentImage(image)
        setWalkthroughText(text)

        setAllowNext(currentLine === numOfLines)
    }, [currentLine, loopIteration, numOfLines, props.flowChart, setAllowNext])

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

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className='flex gap-5 w-full'>
                <div className='flex flex-col w-1/2 justify-center'>
                    <CodeStep 
                    props={{
                        code: props.code.replace("%N", props.loop.display === "iteration" ? loopIteration : iteratorVariable),
                        skipLines: props.skipLines,
                        enableNext: true,
                        getLine: getLine
                    }}
                    loop={{
                        exists: props.loop.exists,
                        lines: props.loop.lines,
                        times: props.loop.iterations,
                        getIteration: getIteration
                    }}
                    />
                </div>
                <div className='flex w-1/2 justify-center'>
                    {currentImage !== "" && 
                        <img
                            src={currentImage}
                            alt='Current flowchart.'
                        />
                    }
                </div>
            </div>
            <Reader text={walkthroughText}/>
        </div>
    )
}

export default CodeStepFlowchart