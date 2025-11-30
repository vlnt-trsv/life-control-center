import { toast } from "sonner";
import { create } from "zustand";
import type { WidgetNode } from "@/entities/node/types/types";
import { deleteWidget, getWidgets, updateWidget } from "../api/api.db";
import { mapToNode } from "@/shared/lib/utils";
import { applyNodeChanges, type NodeChange } from "@xyflow/react";
import { createWidget } from "@/entities/node/api/api.db";

interface BoardState {
  nodes: WidgetNode[];
  getWidgets: () => Promise<void>;
  addWidget: (data: Partial<WidgetNode>) => void;
  updateWidget: (changes: NodeChange[]) => void;
  deleteWidget: (id: string) => Promise<void>;

  // Проверки для тернарных операторов
  isNodesLoad: boolean;
}

export const useBoardStore = create<BoardState>((set, get) => {
  return {
    nodes: [],
    isNodesLoad: false,

    async getWidgets() {
      const widgets = await getWidgets();
      const nodes = widgets.map(mapToNode);
      set({ nodes, isNodesLoad: true });
    },

    async addWidget(data: Partial<WidgetNode>) {
      if (!data) return;

      await createWidget({
        id: crypto.randomUUID(),
        type: "widget",
        data: data,
        position: { x: 0, y: 0 },
      });
      toast.success("Виджет успешно создан!");
    },

    async updateWidget(changes) {
      const prevNode = get().nodes;
      const nextNode = applyNodeChanges(changes, prevNode);
      set({ nodes: nextNode });

      for (const change of changes) {
        if (change.type === "position" && change.position) {
          const { id, position } = change;
          await updateWidget({
            id,
            position,
          });
        }
      }
    },

    async deleteWidget(id) {
      await deleteWidget(id);
      set((state) => ({
        nodes: state.nodes.filter((n) => n.id !== id),
      }));
      toast.success("Виджет успешно удалён!");
    },
  };
});
