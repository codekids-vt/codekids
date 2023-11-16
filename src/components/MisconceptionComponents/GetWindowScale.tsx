import {useRef} from 'react';

export const GetWindowScale = () => {
    const widthBaseline : number = 2560
    if(typeof window !== "undefined")
    {
        const windowWidth = window.innerWidth

        const zoomScale = windowWidth / widthBaseline

        return zoomScale
    }
}