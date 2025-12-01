import type { Node } from "@xyflow/react";
import type React from "react";

export interface WidgetType {
  value: string;
  label: string;
  icon: React.ReactElement;
  ui: React.ReactNode;
}

export interface WidgetData extends Record<string, unknown> {
  title: string;
  widgetType?: WidgetType;
  isLike?: boolean;
  isStar?: boolean;
  isBookmark?: boolean;
}

export type WidgetNode = Node<WidgetData>;

export interface Props {
  data: Pick<WidgetData, "title" | "content">;
}
