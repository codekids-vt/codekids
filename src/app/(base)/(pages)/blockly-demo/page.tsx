"use client"

import { useEffect, useRef, useState } from "react";

import { Workspace } from "blockly";
import { javascriptGenerator } from "blockly/javascript";

import useWorkspace from "@/components/Blockly/useWorkspace";
import toolbox from "./_toolbox";

export default function BlocklyDemo() {
  const workspaceRef = useRef(null);

  const [codeOutput, setCodeOutput] = useState<string>();
  // if undefined, we had a successful test!:
  const [codeResult, setCodeResult] = useState<Error>();

  useWorkspace({
    ref: workspaceRef,
    toolboxDefinition: toolbox,
    onWorkspaceChange: (workspace: Workspace) => {
      setCodeOutput(javascriptGenerator.workspaceToCode(workspace));
    }
  });

  const runTests = () => {
    
  }
  
  return (
    <div className="mx-auto my-8 max-w-4xl">
      <div 
        ref={workspaceRef}
        className="mx-auto mb-2 h-[720px]"
      />

      <section className="mb-2">
        <h1 className="font-bold text-xl">Testing</h1>
        {
          codeOutput
            ? <pre className="font-mono">{codeOutput}</pre>
            : <p>Run your code to get insight about bugs!</p>
        }
      </section>

      <section>
        <h1 className="font-bold text-xl">Your Code</h1>
        {
          codeOutput
            ? <pre className="font-mono">{codeOutput}</pre>
            : <p>Write some code and it&apos;ll pop up here!</p>
        }
      </section>
    </div>
  );
}
