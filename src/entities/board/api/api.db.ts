import { supabase } from "@/shared/api/supabaseClient";
import { type WidgetRecord } from "@/shared/api/types/types.db";
import { mapToDB } from "@/shared/lib/utils";

const TABLE = "widgets";

export async function getWidgets(): Promise<WidgetRecord[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;

  return (data ?? []).map(mapToDB);
}

export async function updateWidgetPosition(params: {
  id: string;
  position: { x: number; y: number };
}): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .update({
      position_x: params.position.x,
      position_y: params.position.y,
    })
    .eq("id", params.id);

  if (error) throw error;
}

export async function deleteWidget(id: string): Promise<void> {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);

  if (error) throw error;
}
