import { useState, useLayoutEffect } from "react";

/*
    Code source: https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react
*/

export const GetWindowScale = () => {
  const widthBaseline: number = 2560; // This is used as baseline since it's the width of my main development computer
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size[0] / widthBaseline;
};
