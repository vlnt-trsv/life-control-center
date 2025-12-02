import { supabase } from "@/shared/api/supabaseClient";
import type { Todo } from "../types/types";
import type { TodoRecord } from "@/shared/api/types/types.db";

const TABLE = "todos";

export async function getTodos(): Promise<TodoRecord[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("createdAt", { ascending: true });

  if (error) throw error;

  return data ?? [];
}

export async function createTodo(params: Todo): Promise<TodoRecord> {
  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      id: params.id,
      title: params.title,
    })
    .select("*")
    .single();

  if (error) throw error;

  return data;
}

export async function deleteTodo(id: Todo["id"]): Promise<void> {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);

  if (error) throw error;
}

export async function updateTodo(params: {
  id: Todo["id"];
  title: Todo["title"];
  isComplete: Todo["isComplete"];
}): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .update({
      title: params.title,
      isComplete: params.isComplete,
    })
    .eq("id", params.id);

  if (error) throw error;
}
