import { create } from "zustand";
import type { Todo } from "../types/types";
import {
  createTodo as createTodoApi,
  deleteTodo as deleteTodoApi,
  getTodos as getTodosApi,
  updateTodo as updateTodoApi,
} from "../api/api.db";
import { toast } from "sonner";

interface TodoState {
  todos: Todo[];

  getTodos: () => Promise<void>;
  createTodo: (title: Todo["title"]) => Promise<void>;
  deleteTodo: (id: Todo["id"]) => Promise<void>;
  updateTodo: (
    id: Todo["id"],
    newTitle: Todo["title"],
    isComplete?: Todo["isComplete"]
  ) => Promise<void>;

  isTodosLoad: boolean;
}

export const useTodoStore = create<TodoState>((set, get) => {
  return {
    todos: [],
    isTodosLoad: false,

    async getTodos() {
      const todos = await getTodosApi();
      set({ todos, isTodosLoad: true });
    },

    async createTodo(title) {
      await createTodoApi({
        id: crypto.randomUUID(),
        title,
        isComplete: false,
      });
      get().getTodos();
      toast.success("Задача успешно создана!");
    },

    async deleteTodo(id) {
      await deleteTodoApi(id);
      get().getTodos();
      toast.success("Задача успешно удалена!");
    },

    async updateTodo(id, title, isComplete) {
      await updateTodoApi({ id, title, isComplete });
      get().getTodos();
      toast.success("Задача успешно обновлена!");
    },
  };
});
