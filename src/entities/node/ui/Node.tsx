import type { Props } from "../types/types";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Separator } from "@radix-ui/react-separator";

export const Node = ({ data }: Props) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>{data.title}</CardHeader>
      <Separator className="border" />
      <CardContent>{data.content}</CardContent>
    </Card>
  );
};
