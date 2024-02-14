"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Blockly, { Events, WorkspaceSvg } from "blockly";
import { BlocklyHookProps } from "./BlocklyProps";

export default function useWorkspace({
  ref,
  workspaceOptions,
  toolboxDefinition,
  onWorkspaceChange,
}: BlocklyHookProps) {
  const [workspace, setWorkspace] = useState<WorkspaceSvg>();
  const workspaceOptionsRef = useRef(workspaceOptions);

  useEffect(() => {
    workspaceOptionsRef.current = workspaceOptions;
  }, [workspaceOptions]);

  // when either the toolbox or ref change, re-inject:
  useEffect(() => {
    setWorkspace(
      Blockly.inject(
        // FIXME: may God save this from erroring:
        ref.current ?? "",
        {
          ...workspaceOptionsRef.current,
          toolbox: toolboxDefinition,
        },
      ),
    );
  }, [ref, toolboxDefinition]);

  // when either our workspace or toolbox updates, update the active workspace:
  useEffect(() => {
    if (workspace) {
      workspace.updateToolbox(toolboxDefinition);
    }
  }, [workspace, toolboxDefinition]);

  const handleWorkspaceChange = useCallback(() => {
    if (onWorkspaceChange && workspace) {
      onWorkspaceChange(workspace);
    }
  }, [onWorkspaceChange, workspace]);

  useEffect(() => {
    // check for callback first:
    workspace?.addChangeListener((event: Events.Abstract) => {
      handleWorkspaceChange();
    });
  }, [workspace, handleWorkspaceChange]);

  // FIXME: redundant?
  return { workspace };
}
