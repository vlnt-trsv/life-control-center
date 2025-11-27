import { Background, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Node } from "@/entities/node/ui/Node";
import { useBoardStore } from "../model/store";
import { useEffect } from "react";

export const Board = () => {
  const { nodes, updateWidget, getWidgets } = useBoardStore();

  useEffect(() => {
    getWidgets();
  }, [getWidgets]);

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
