"use client"

import { useRef, useState } from "react";

import { Workspace } from "blockly";
import { javascriptGenerator } from "blockly/javascript";

import useWorkspace from "@/components/Blockly/useWorkspace";
import toolbox from "./_toolbox";

export default function BlocklyDemo() {
  const workspaceRef = useRef(null);
  const [code, setCode] = useState<string>();

  useWorkspace({
    ref: workspaceRef,
    toolboxDefinition: toolbox,
    onWorkspaceChange: (workspace: Workspace) => {
      console.log(javascriptGenerator.workspaceToCode(workspace));
    }
  });
  
  return (
    <div className="mx-auto">
      <div 
        ref={workspaceRef}
        className="mx-auto max-w-4xl h-[2000px]"
      />
    </div>
  );
}
