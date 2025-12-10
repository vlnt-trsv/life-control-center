import { supabase } from "@/shared/api/supabaseClient";
import type { Note } from "../types/types";
import type { WidgetNode } from "@/entities/node/types/types";

const TABLE = "notes";

export async function getNotes(params: {
  widgetId: WidgetNode["id"];
}): Promise<Note[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("widgetId", params.widgetId)
    .order("createdAt", { ascending: true });

  if (error) throw error;

  return data ?? [];
}

export async function createNote(params: Note): Promise<Note> {
  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      id: params.id,
      userId: params.userId,
      widgetId: params.widgetId,
      content: params.content,
    })
    .select("*")
    .single();

  if (error) throw error;

  return data;
}

export async function deleteNote(params: {
  id: Note["id"];
  widgetId: WidgetNode["id"];
}): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", params.id)
    .eq("widgetId", params.widgetId);

  if (error) throw error;
}

export async function updateNote(params: {
  id: Note["id"];
  widgetId: WidgetNode["id"];
  content: Note["content"];
}): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .update({
      content: params.content,
    })
    .eq("id", params.id)
    .eq("widgetId", params.widgetId);

  if (error) throw error;
}
