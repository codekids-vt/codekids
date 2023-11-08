import {useRef} from 'react';

export const GetWindowScale = () => {
    const widthBaseline : number = 2560
    const heightBaseline : number = 1315
    if(typeof window !== "undefined")
    {
        const windowWidth = useRef(window.innerWidth)
        const windowHeight = useRef(window.innerHeight)
        const zoomScale = (windowHeight.current * windowWidth.current) / (widthBaseline * heightBaseline)

        return zoomScale
    }
}