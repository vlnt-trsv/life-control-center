import { supabase } from "@/shared/api/supabaseClient";
import { type WidgetRecord } from "@/shared/api/types/types.db";
import type { WidgetNode } from "../types/types";

const TABLE = "widgets";

export async function createWidget(params: WidgetNode): Promise<WidgetRecord> {
  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      id: params.id,
      type: params.type,
      widgetType: params.data?.widgetType?.value,
      title: params.data?.title,
      positionX: params.position.x,
      positionY: params.position.y,
    })
    .select("*")
    .single();

  if (error) throw error;

  return data;
}
