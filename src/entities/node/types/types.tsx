import type { Node } from "@xyflow/react";
import { ListTodo, Notebook } from "lucide-react";
import type React from "react";

export const WIDGET_TYPES = [
  {
    value: "todo",
    label: "Чек-лист",
    icon: <ListTodo />,
  },
  {
    value: "note",
    label: "Заметки",
    icon: <Notebook />,
  },
] as const;

export type WidgetType = (typeof WIDGET_TYPES)[number];

export interface WidgetData extends Record<string, unknown> {
  title: string;
  content: React.ReactNode;
  type?: WidgetType;
  isLike?: boolean;
  isStar?: boolean;
  isBookmark?: boolean;
}

export type WidgetNode = Node<WidgetData>;

export interface Props {
  data: Pick<WidgetData, "title" | "content">;
}
