import { create } from "zustand";
import type { Todo } from "../types/types";
import {
  createTodo as createTodoApi,
  deleteTodo as deleteTodoApi,
  getTodos as getTodosApi,
  updateTodo as updateTodoApi,
} from "../api/api.db";
import { toast } from "sonner";
import type { WidgetNode } from "@/entities/node/types/types";
import type { User } from "@/entities/user/types/types";

interface TodoState {
  todos: Record<string, Todo[]>;

  getTodos: (widgetId: WidgetNode["id"]) => Promise<void>;
  createTodo: (
    title: Todo["title"],
    widgetId: WidgetNode["id"],
    userId: User["id"]
  ) => Promise<void>;
  deleteTodo: (id: Todo["id"], widgetId: WidgetNode["id"]) => Promise<void>;
  updateTodo: (
    id: Todo["id"],
    widgetId: WidgetNode["id"],
    newTitle: Todo["title"],
    isComplete?: Todo["isComplete"]
  ) => Promise<void>;

  isTodosLoad: boolean;
}

export const useTodoStore = create<TodoState>((set, get) => {
  return {
    todos: {},
    isTodosLoad: false,

    async getTodos(widgetId) {
      const todos = await getTodosApi({ widgetId });
      set((state) => ({
        todos: {
          ...state.todos,
          [widgetId]: todos,
        },
      }));
    },

    async createTodo(title, widgetId, userId) {
      await createTodoApi({
        id: crypto.randomUUID(),
        title,
        userId: userId,
        widgetId: widgetId,
      });

      get().getTodos(widgetId);
      toast.success("Задача успешно создана!");
    },

    async deleteTodo(id, widgetId) {
      await deleteTodoApi({ id, widgetId });
      get().getTodos(widgetId);
      toast.success("Задача успешно удалена!");
    },

    async updateTodo(id, widgetId, title, isComplete) {
      await updateTodoApi({ id, widgetId, title, isComplete });
      get().getTodos(widgetId);
      toast.success("Задача успешно обновлена!");
    },
  };
});
