import type { WidgetData, WidgetNode } from "@/entities/node/types/types";
import { supabase } from "@/shared/api/supabaseClient";

const TABLE = "widgets";

export async function createWidget(params: WidgetNode): Promise<WidgetNode> {
  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      id: params.id,
      userId: params.data.userId,
      type: params.type,
      widgetType: params.data?.widgetType?.value,
      title: params.data?.title,
      position: {
        x: params.position.x,
        y: params.position.y
      },
    })
    .select("*")
    .single();

  if (error) throw error;

  return data;
}
export async function getWidgets(): Promise<WidgetNode[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("createdAt", { ascending: true });

  if (error) throw error;

  return data ?? [];
}

export async function onNodesChange(params: {
  id: string;
  position: { x: number; y: number };
}): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .update({
      position: {
        x: params.position.x,
        y: params.position.y,
      },
    })
    .eq("id", params.id);

  if (error) throw error;
}

export async function updateWidget(params: {
  id: string;
  data: WidgetData;
}): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .update({
      ...params.data,
    })
    .eq("id", params.id);

  if (error) throw error;
}

export async function deleteWidget(id: string): Promise<void> {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);

  if (error) throw error;
}
