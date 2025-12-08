import { supabase } from "@/shared/api/supabaseClient";
import type { Todo } from "../types/types";
import type { TodoRecord } from "@/shared/api/types/types.db";
import type { WidgetNode } from "@/entities/node/types/types";

const TABLE = "todos";

export async function getTodos(params: {
  widgetId: WidgetNode["id"];
}): Promise<TodoRecord[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("widgetId", params.widgetId)
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
      userId: params.userId,
      widgetId: params.widgetId,
    })
    .select("*")
    .single();

  if (error) throw error;

  return data;
}

export async function deleteTodo(params: {
  id: Todo["id"];
  widgetId: WidgetNode["id"];
}): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", params.id)
    .eq("widgetId", params.widgetId);

  if (error) throw error;
}

export async function updateTodo(params: {
  id: Todo["id"];
  widgetId: WidgetNode["id"];
  title: Todo["title"];
  isComplete: Todo["isComplete"];
}): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .update({
      title: params.title,
      isComplete: params.isComplete,
    })
    .eq("id", params.id)
    .eq("widgetId", params.widgetId);

  if (error) throw error;
}
