import type { WidgetNodeData } from "../types/types";
import { Card } from "@/shared/components/ui/card";
import { Separator } from "@radix-ui/react-separator";

export const Node = ({ data }: WidgetNodeData) => {
  const { title, content } = data;
  return (
    <Card className="w-full max-w-sm">
      {title}
      <Separator className="border" />
      {content}
    </Card>
  );
};
