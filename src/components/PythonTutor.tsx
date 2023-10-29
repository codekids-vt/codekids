import { useState } from "react";

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
        <textarea className="w-10/12 flex-grow h-[calc(100vh-22rem)] overflow-y-scroll border-2 border-gray-300 p-2 shadow-2xl bg-gray-800 text-green-500 rounded-2xl"
          value={code} onChange={(e) => setCode(e.target.value)} />
      }
      <div className="p-4">
        <button onClick={() => setEditing(!editing)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
          {editing ? "Run" : "Show Editor"}
        </button>
      </div>
    </div>
  );
}
