import { Background, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Node } from "@/entities/node/ui/Node";
import { useBoardStore } from "../model/store";
import { EditWidget } from "@/features/editWidget/ui/EditWidget";

export const Board = () => {
  const { nodes, onNodesChange } = useBoardStore();

  return (
    <div className="h-screen w-screen">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        onError={(id, message) => console.error(`[Error ${id}] ${message}`)}
        nodeTypes={{ widget: Node }}
        fitView
        panOnScroll
        zoomOnScroll
        zoomOnPinch
        deleteKeyCode=""
      >
        {/* <Controls /> */}
        {/* <MiniMap /> */}
        <Background variant="dots" gap={16} size={1} />
        <EditWidget />
      </ReactFlow>
    </div>
  );
};
