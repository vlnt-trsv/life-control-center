import type React from "react";

export interface WidgetNodeData {
  [x: string]: unknown;
  data: {
    title: React.ReactNode;
    content: React.ReactNode;
  };
}
