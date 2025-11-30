import { supabase } from "@/shared/api/supabaseClient";
import { type WidgetRecord } from "@/shared/api/types/types.db";

const TABLE = "widgets";

export async function getWidgets(): Promise<WidgetRecord[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("createdAt", { ascending: true });

  if (error) throw error;

  return data ?? [];
}

export async function updateWidget(params: {
  id: string;
  position: { x: number; y: number };
}): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .update({
      positionX: params.position.x,
      positionY: params.position.y,
    })
    .eq("id", params.id);

  if (error) throw error;
}

export async function deleteWidget(id: string): Promise<void> {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);

  if (error) throw error;
}
