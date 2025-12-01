import { Todo } from "@/entities/todo/ui/Todo";
import { ListTodo, Notebook } from "lucide-react";

export const WIDGET_TYPES = [
  {
    value: "todo",
    label: "Чек-лист",
    icon: <ListTodo />,
    ui: <Todo />,
  },
  {
    value: "note",
    label: "Заметки",
    icon: <Notebook />,
    ui: <>Note</>,
  },
] as const;
