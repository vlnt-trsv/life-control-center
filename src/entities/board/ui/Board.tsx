import React from "react";
import {
  applyNodeChanges,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  type NodeTypes,
  type OnNodesChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Node } from "@/entities/node/ui/Node";
import type { NodeType } from "../types/types";
import { CardContent, CardHeader } from "@/shared/components/ui/card";

const nodeTypes: NodeTypes = {
  widget: Node,
  //   Добавляем сюда типы нод
};

export const Board: React.FC = () => {
  const [nodes, setNodes] = React.useState<NodeType[]>([
    {
      id: "1",
      position: { x: 200, y: 200 },
      type: "widget",
      data: {
        title: <CardHeader>Header</CardHeader>,
        content: <CardContent>Content</CardContent>,
      },
    },
  ]);

  const onNodesChange: OnNodesChange = React.useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
    // TODO: Пробросить изменения в Zustand, чтобы сохранить позицию
  }, []);

  return (
    <div className="h-screen w-screen">
      <ReactFlow
        nodes={nodes}
        edges={[]}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        fitView
        panOnScroll
        zoomOnScroll
        zoomOnPinch
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={16} size={1} />
      </ReactFlow>
    </div>
  );
};
