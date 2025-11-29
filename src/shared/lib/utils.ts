import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { WidgetRecord, WidgetRow } from "../api/types/types.db";
import type { WidgetNode } from "@/entities/node/types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<T extends (...args: never[]) => void>(
  func: T,
  delay: number
): T {
  let timeoutId: ReturnType<typeof setTimeout>;
  return ((...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }) as T;
}
// TODO: Написать типы для маппов
export function mapToDB(row: any) {
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    widget_type: row.widget_type,
    position_x: row.position_x,
    position_y: row.position_y,
    width: row.width,
    height: row.height,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapToNode(rec: any) {
  return {
    id: rec.id,
    type: rec.type,
    position: {
      x: rec.position_x,
      y: rec.position_y,
    },
    data: {
      widget_type: rec.widget_type?.value,
      title: rec.title,
    },
  };
}
