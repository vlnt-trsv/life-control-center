import type React from "react";

export interface WidgetNodeData extends Record<string, unknown> {
  title: React.ReactNode;
  content: React.ReactNode;
}
