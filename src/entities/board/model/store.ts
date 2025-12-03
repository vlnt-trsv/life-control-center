import { toast } from "sonner";
import { create } from "zustand";
import type { WidgetData, WidgetNode } from "@/entities/node/types/types";
import {
  deleteWidget as deleteWidgetApi,
  getWidgets as getWidgetsApi,
  onNodesChange as onNodesChangeApi,
  updateWidget as updateWidgetApi,
} from "../api/api.db";
import { mapToNode } from "@/shared/lib/utils";
import { applyNodeChanges, type NodeChange } from "@xyflow/react";
import { createWidget } from "@/entities/node/api/api.db";

interface BoardState {
  nodes: WidgetNode[];

  getWidgets: () => Promise<void>;
  addWidget: (data: WidgetData) => void;
  updateWidget: (
    id: WidgetNode["id"],
    data: Partial<WidgetData>
  ) => Promise<void>;
  deleteWidget: (id: WidgetNode["id"]) => Promise<void>;

  onNodesChange: (changes: NodeChange<WidgetNode>[]) => void;

  // Проверки для тернарных операторов
  isNodesLoad: boolean;

  // Для проброса
  editDialogOpen: {
    isDialogOpen: boolean;
    editingNodeId?: WidgetNode["id"];
  };
  setEditDialogOpen: (isOpen: boolean, id?: WidgetNode["id"]) => void;
}

export const useBoardStore = create<BoardState>((set, get) => {
  return {
    nodes: [],
    isNodesLoad: false,

    editDialogOpen: {
      isDialogOpen: false,
      editingNodeId: "",
    },
    setEditDialogOpen(isOpen, id) {
      set({ editDialogOpen: { isDialogOpen: isOpen, editingNodeId: id } });
    },

    async getWidgets() {
      const widgets = await getWidgetsApi();
      const nodes = widgets.map(mapToNode);
      set({ nodes, isNodesLoad: true });
    },

    async addWidget(data: WidgetData) {
      if (!data) return;

      await createWidget({
        id: crypto.randomUUID(),
        type: "widget",
        data: data,
        position: { x: 0, y: 0 },
      });
      get().getWidgets();
      toast.success("Виджет успешно создан!");
    },

    async updateWidget(id, data) {
      let nodeToUpdate: WidgetNode | undefined;
      console.log(data);

      set((state) => ({
        nodes: state.nodes.map((node) => {
          if (node.id === id) {
            nodeToUpdate = {
              ...node,
              data: {
                ...node.data,
                ...data,
              },
            };
            return nodeToUpdate;
          }
          return node;
        }),
      }));

      if (nodeToUpdate) {
        await updateWidgetApi({
          id,
          data: nodeToUpdate.data,
        });
        toast.success("Виджет успешно обновлён!");
      }
    },

    async onNodesChange(changes) {
      const prevNode = get().nodes;
      const nextNode = applyNodeChanges(changes, prevNode);
      set({ nodes: nextNode });

      for (const change of changes) {
        if (change.type === "position" && change.position) {
          const { id, position } = change;
          await onNodesChangeApi({
            id,
            position,
          });
        }
      }
    },

    async deleteWidget(id) {
      await deleteWidgetApi(id);
      set((state) => ({
        nodes: state.nodes.filter((n) => n.id !== id),
      }));
      toast.success("Виджет успешно удалён!");
    },
  };
});
