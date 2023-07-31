"use client"

import { useRef, useState } from "react";

import { Workspace } from "blockly";
import { javascriptGenerator } from "blockly/javascript";

import useWorkspace from "@/components/Blockly/useWorkspace";
import toolbox from "./_toolbox";

// testing build:
class AssertError extends Error {
  constructor(message: string) {
    super(message);
  }
}



const interpretError = (e: any) => {
  if (e instanceof AssertError) {
    return "Looks like a test case failed! Look for the matching case below, and see if your solution works for the two input values.";
  }
  if (e instanceof ReferenceError) {
    return "Looks like we couldn't find your function. Did you name your function \"add\"?";
  }
  else if (e instanceof TypeError) {
  }
  // else if (e instanceof ...) {
  // }

  return "";
}

export default function BlocklyDemo() {
  const workspaceRef = useRef(null);

  const [codeOutput, setCodeOutput] = useState<string>();
  // if undefined, we had a successful test!:
  const [codeResult, setCodeResult] = useState<Error | boolean>();

  useWorkspace({
    ref: workspaceRef,
    toolboxDefinition: toolbox,
    onWorkspaceChange: (workspace: Workspace) => {
      setCodeOutput(javascriptGenerator.workspaceToCode(workspace));

      if (!codeOutput) {
        // reset result state:
        setCodeResult(undefined);
      }
    }
  });

  const runTests = () => {
    if (!codeOutput) {
      return;
    }

    const testingCode = codeOutput + "\nalert(`Hello ${firstName}!`)";

    try {
      eval(testingCode);
      setCodeResult(true);
    }
    catch (e: any) {
      setCodeResult(e);
      return;
    }
  }

  let codeResultElement;

  if (!codeResult) {
    codeResultElement = <p>Run your code to get insight about bugs!</p>;
  }
  // if we reach an error, display it and give an explanation (if possible):
  else if (codeResult instanceof Error) {
    codeResultElement = (
      <>
        <pre className="font-mono text-red-500">
          {`Error: ${codeResult.message}`}
        </pre>
        <p>{interpretError(codeResult)}</p>
      </>
    );
  }
  else if (codeResult === true) {
    codeResultElement = (
      <p className="text-green-500">
        Your solution worked! Nice job!
      </p>
    );
  }
  
  return (
    <div className="mx-auto my-8 max-w-6xl">
      <section className="mb-2 text-sm">
        <h1 className="font-bold text-xl">Blockly Demo</h1>
        <p>
          Create a variable called &quot;firstName&quot; that takes text and put your name in it.
        </p>
      </section>

      <button 
        onClick={runTests}
        className="my-1 px-2 py-1 text-sm rounded-sm hover:bg-blue-100 transition-colors outline outline-1 outline-black/20 hover:shadow-md shadow-black"
      >
        Test my code!
      </button>

      <div className="flex flex-col sm:flex-row gap-2">
        <div 
          ref={workspaceRef}
          className="mx-auto mb-2 flex-grow h-[720px]"
        />

        <div className="card p-4 max-w-xs">
          <section className="mb-2 text-sm">
            <h1 className="font-bold text-xl">Testing</h1>
            { codeResultElement }
          </section>

          <section className="text-sm">
            <h1 className="font-bold text-xl">Your Code</h1>
            {
              codeOutput
                ? <p className="font-mono break-words">{codeOutput}</p>
                : <p>Write some code and it&apos;ll pop up here!</p>
            }
          </section>
        </div>
      </div>
    </div>
  );
}
