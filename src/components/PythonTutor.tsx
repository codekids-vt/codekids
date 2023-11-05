import { useState } from "react";

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';


export interface IPythonTutorProps {
  code: string
  cumulative?: boolean,
  width?: number,
  height?: number,
}

export function PythonTutor({ props }: { props: any | IPythonTutorProps }) {

  const [editing, setEditing] = useState(false);
  const [code, setCode] = useState(props.code);

  const width = props.width ?? 650;
  const height = props.height ?? 400;
  const cumulative = props.cumulative ?? false;

  return (
    <div className="flex flex-col flex-grow items-center w-full">
      {!editing &&
        <iframe width={width} height={height} className="border-2 border-gray-300 shadow-2xl rounded-2xl"
          src={`https://pythontutor.com/iframe-embed.html#code=${encodeURIComponent(code)}&cumulative=${cumulative}&py=2`}>
        </iframe>
      }
      {editing &&
        <Editor
          value={code}
          onValueChange={code => setCode(code)}
          highlight={code => highlight(code, languages.js)}
          padding={10}
          style={{ fontFamily: '"Fira code", "Fira Mono", monospace', }}
          className="w-10/12 text-md h-[calc(100vh-22rem)] overflow-y-scroll border-2 p-10 shadow-2xl rounded-xl"
        />
      }
      <div className="p-4">
        <button onClick={() => setEditing(!editing)} className="bg-primary-green hover:bg-hover-green hover:-translate-y-1 hover:shadow-2xl text-white font-bold py-2 px-4 rounded-full">
          {editing ? "Run Code" : "Edit Code"}
        </button>
      </div>
    </div>
  );
}
