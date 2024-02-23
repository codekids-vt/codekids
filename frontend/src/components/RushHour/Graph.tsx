import { GraphCanvas, GraphEdge, GraphNode } from "reagraph";
import { Car, stateId, stateIdPair } from "./types";

export interface IGraphProps {
  state: string;
  states: Record<string, Car[]>;
  stateTransitions: Record<stateIdPair, [stateId, stateId]>;
}

export default function Graph(props: IGraphProps) {
  const nodes: GraphNode[] = Object.keys(props.states).map((state) => {
    const isCurrentState = props.state === state;
    return {
      id: state.toString(),
      fill: isCurrentState ? "red" : "black",
    };
  });
  // remove duplicate stateTransitions
  const edges: GraphEdge[] = Object.values(props.stateTransitions).map(
    (transition) => {
      return {
        id: `${transition[0]}-${transition[1]}`,
        source: transition[0].toString(),
        target: transition[1].toString(),
      };
    },
  );

  return (
    <div className="w-full h-full relative">
      <GraphCanvas
        edgeArrowPosition="none"
        animated={false}
        nodes={nodes}
        edges={edges}
      />
    </div>
  );
}
