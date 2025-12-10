import { Todo } from "@/entities/todo/ui/Todo";
import { ListTodo, Notebook } from "lucide-react";
import type { WidgetNode } from "./types/types";
import { Note } from "../note/ui/Note";

export const WIDGET_TYPES = [
  {
    value: "todo",
    label: "Чек-лист",
    icon: <ListTodo />,
    ui: (props: { widgetId: WidgetNode["id"] }) => <Todo {...props} />,
  },
  {
    value: "note",
    label: "Заметки",
    icon: <Notebook />,
    ui: (props: { widgetId: WidgetNode["id"] }) => <Note {...props} />,
  },
] as const;
