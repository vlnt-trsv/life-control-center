import { create } from "zustand";
import { applyNodeChanges, type Node, type NodeChange } from "@xyflow/react";
import type { WidgetData } from "@/entities/node/types/types";
import type { WidgetRecord } from "../types/types.db";
import {
  createWidget,
  getWidgets,
  updateWidgetPosition,
} from "../types/api.db";

export type WidgetNode = Node<WidgetData>;

interface BoardState {
  nodes: WidgetNode[];
  getWidgets: () => Promise<void>;
  updateWidget: (changes: NodeChange[]) => void;
  addWidget: (data: WidgetData) => void;
}

function widgetRecordToNode(rec: WidgetRecord): WidgetNode {
  return {
    id: rec.id,
    type: "widget",
    position: { x: rec.positionX, y: rec.positionY },
    data: {
      type: rec.type,
      title: rec.title,
      config: rec.config,
      content: rec.content,
    },
  };
}

function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): T {
  let timeoutId: ReturnType<typeof setTimeout>;
  return ((...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }) as T;
}

export const useBoardStore = create<BoardState>((set, get) => {
  const debouncedUpdatePosition = debounce(updateWidgetPosition, 1000);

  return {
    nodes: [],

    async getWidgets() {
      const widgets = await getWidgets();
      const nodes = widgets.map(widgetRecordToNode);
      set({ nodes });
    },

    updateWidget(changes) {
      const prevNodes = get().nodes;
      const nextNodes = applyNodeChanges(changes, prevNodes);
      set({ nodes: nextNodes });

      // сохранение позиции в Supabase
      for (const change of changes) {
        if (change.type === "position" && change.position) {
          const { id, position } = change;
          void debouncedUpdatePosition({
            id,
            positionX: position.x,
            positionY: position.y,
          });
        }
      }
    },

    addWidget: (data: WidgetData) => {
      const newWidget = {
        id: crypto.randomUUID(),
        position: { x: 0, y: 0 },
        type: data.type,
        data: {
          type: data.type?.value,
          title: data.title,
          content: data.content,
        },
      };
      void createWidget({
        id: newWidget.id,
        type: newWidget.type || "",
        data: {
          type: newWidget.data.type ?? "unknown",
          title: newWidget.data.title,
          content: newWidget.data.content,
        },
        positionX: newWidget.position.x,
        positionY: newWidget.position.y,
      });
      set({ nodes: [...get().nodes, newWidget] });
    },
  };
});
