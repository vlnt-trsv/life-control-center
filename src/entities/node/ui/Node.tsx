import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Separator } from "@radix-ui/react-separator";
import type { WidgetNode, WidgetType } from "../types/types";
import { Todo } from "@/entities/todo/ui/Todo";
import { NodeToolbar } from "@xyflow/react";
import { Button } from "@/shared/ui/button";
import { useBoardStore } from "@/entities/board/model/store";
import { Trash } from "lucide-react";

export const Node = ({ id }: WidgetNode) => {
  const { nodes, deleteWidget } = useBoardStore();

  const contentType = (type: WidgetType) => {
    switch (type) {
      case "todo":
        return <Todo />;
      default:
        return null;
    }
  };

  const deleteNode = (id) => {
    deleteWidget(id);
  };

  const node = nodes.find((node) => node.id === id);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>{node?.data.title}</CardHeader>
      <Separator className="border" />
      <CardContent>{contentType(node?.data.widgetType)}</CardContent>
      <NodeToolbar>
        <Button onClick={() => deleteNode(id)}>
          <Trash />
        </Button>
      </NodeToolbar>
    </Card>
  );
};
