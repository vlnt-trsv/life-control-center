import { create } from "zustand";
import { applyNodeChanges, type NodeChange } from "@xyflow/react";
import type { WidgetNode } from "@/entities/node/types/types";
import { getWidgets, updateWidgetPosition } from "../api/api.db";
import { mapToNode } from "@/shared/lib/utils";

interface BoardState {
  nodes: WidgetNode[];
  getWidgets: () => Promise<void>;
  updateWidget: (changes: NodeChange[]) => void;
}

export const useBoardStore = create<BoardState>((set, get) => {
  return {
    nodes: [],

    async getWidgets() {
      const widgets = await getWidgets();
      console.log("1", widgets);

      const nodes = widgets.map(mapToNode);

      console.log("2", nodes);

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
          void updateWidgetPosition({
            id,
            position,
          });
        }
      }
    },
  };
});
