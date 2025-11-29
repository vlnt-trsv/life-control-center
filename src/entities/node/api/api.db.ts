import { supabase } from "@/shared/api/supabaseClient";
import { type WidgetRecord } from "@/shared/api/types/types.db";
import type { WidgetNode } from "../types/types";
import { mapToDB } from "@/shared/lib/utils";

const TABLE = "widgets";

export async function createWidget(params: WidgetNode): Promise<WidgetRecord> {
  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      id: params.id,
      type: params.type,
      widget_type: params.data?.widgetType?.value,
      title: params.data?.title,
      position_x: params.position.x,
      position_y: params.position.y,
    })
    .select("*")
    .single();

  if (error) throw error;

  return mapToDB(data);
}
