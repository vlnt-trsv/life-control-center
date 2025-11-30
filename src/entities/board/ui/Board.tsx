import { Background, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Node } from "@/entities/node/ui/Node";
import { useBoardStore } from "../model/store";

export const Board = () => {
  const { nodes, updateWidget, deleteWidget } = useBoardStore();

  return (
    <div className="h-screen w-screen">
      <ReactFlow
        nodes={nodes}
        edges={[]}
        onNodesChange={updateWidget}
        nodeTypes={{ widget: Node }}
        fitView
        panOnScroll
        zoomOnScroll
        zoomOnPinch
      >
        {/* <Controls /> */}
        {/* <MiniMap /> */}
        <Background variant="dots" gap={16} size={1} />
      </ReactFlow>
    </div>
  );
};
