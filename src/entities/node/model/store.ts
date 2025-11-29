import { create } from "zustand";
import type { WidgetData, WidgetNode } from "../types/types";
import { createWidget } from "../api/api.db";

interface NodeState {
  node: WidgetData;
  addWidget: (data: WidgetNode) => void;
}

export const useNodeStore = create<NodeState>((_set, _get) => {
  return {
    node: {},
    addWidget: (data: WidgetNode) => {
      void createWidget({
        id: crypto.randomUUID(),
        type: "widget",
        data: {
          widget_type: data?.widgetType?.value,
          title: data?.title,
        },
        position: { x: 0, y: 0 },
      });
    },
  };
});
