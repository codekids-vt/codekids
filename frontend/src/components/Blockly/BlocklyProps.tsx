import { RefObject } from "react";
import { BlocklyOptions, Workspace } from "blockly";
import { ToolboxDefinition } from "blockly/core/utils/toolbox";

export type BlocklyProps = {
  workspaceOptions?: BlocklyOptions;
  toolboxDefinition: ToolboxDefinition;
  onWorkspaceChange?: (workspace: Workspace) => void;
};

export type BlocklyHookProps =
  & BlocklyProps
  & { ref: RefObject<Element> };
