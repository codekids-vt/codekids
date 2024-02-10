import { useState } from "react";

import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

export interface IPythonTutorProps {
  code: string;
  cumulative?: boolean;
  width?: number;
  height?: number;
}

export function PythonTutor({ props }: { props: any | IPythonTutorProps }) {
  const [editing, setEditing] = useState(false);
  const [code, setCode] = useState(props.code);
  const [scale, setScale] = useState(1);

  // calculate width and height based on device
  const cumulative = props.cumulative ?? false;

  return (
    <div className="flex flex-col flex-grow items-center w-full h-full">
      {!editing && (
        <div className="overflow-scroll flex-grow shadow-2xl rounded-2xl w-full">
          <iframe
            id="pyTutorFrame"
            className="w-full h-full"
            style={{ scale: scale, transformOrigin: "top left" }}
            src={`https://pythontutor.com/iframe-embed.html#code=${encodeURIComponent(code)}&cumulative=${cumulative}&py=2`}
          ></iframe>
        </div>
      )}
      {editing && (
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", "monospace"',
            scale: scale,
            transformOrigin: "top left",
          }}
          className="w-10/12 text-md h-[calc(100vh-22rem)] overflow-y-scroll border-2 p-10 shadow-2xl rounded-xl"
        />
      )}
      <div className="p-4 flex flex-row justify-center items-center space-x-4">
        <button
          onClick={() => setEditing(!editing)}
          className="bg-primary-green text-white font-bold py-2 px-4 rounded-full"
        >
          {editing ? "Run Code" : "Edit Code"}
        </button>
        {!editing && (
          <div className="flex flex-row justify-center items-center font-bold text-white">
            <div className="bg-primary-green rounded-l-full py-2 px-4 hover:shadow-2xl ">
              Zoom
            </div>
            <button
              onClick={() => setScale(scale * 1.2)}
              className=" p-2 border-x-2 border-white bg-primary-green"
            >
              +
            </button>
            <button
              onClick={() => setScale(scale / 1.2)}
              className=" p-2 rounded-r-full border-white bg-primary-green"
            >
              -
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
