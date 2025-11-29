/* eslint-disable @typescript-eslint/no-explicit-any */

import type { WidgetData } from "@/entities/node/types/types";

export interface WidgetRecord extends WidgetData {
  id: string;
  userId: string;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  config: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export function mapWidgetRow(row: any): WidgetRecord {
  return {
    id: row.id,
    userId: row.user_id,
    type: row.type ,
    title: row.title,
    content: row.content,
    positionX: row.position_x,
    positionY: row.position_y,
    width: row.width,
    height: row.height,
    config: (row.config ?? {}) as Record<string, unknown>,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
