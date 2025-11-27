import { supabase } from "@/shared/api/supabaseClient";
import type { WidgetType } from "./types";
import { mapWidgetRow, type WidgetRecord } from "./types.db";

const TABLE = "widgets";

export async function getWidgets(): Promise<WidgetRecord[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;

  return (data ?? []).map(mapWidgetRow);
}

export async function createWidget(params: {
  id: string;
  type: string;
  title: React.ReactNode;
  content: React.ReactNode;
  positionX?: number;
  positionY?: number;
  width?: number;
  height?: number;
  config?: Record<string, unknown>;
}): Promise<WidgetRecord> {
  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      id: params.id,
      type: params.type,
      title: params.title,
      content: params.title,
      position_x: params.positionX ?? 200,
      position_y: params.positionY ?? 200,
      width: params.width ?? 320,
      height: params.height ?? 240,
      config: params.config ?? {},
    })
    .select("*")
    .single();

  if (error) throw error;

  return mapWidgetRow(data);
}

export async function updateWidgetPosition(params: {
  id: string;
  positionX: number;
  positionY: number;
}): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .update({
      position_x: params.positionX,
      position_y: params.positionY,
    })
    .eq("id", params.id);

  if (error) throw error;
}

export async function deleteWidget(id: string): Promise<void> {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);

  if (error) throw error;
}
