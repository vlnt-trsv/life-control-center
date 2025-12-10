import { toast } from "sonner";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { WidgetData, WidgetNode } from "@/entities/node/types/types";
import {
  deleteWidget as deleteWidgetApi,
  getWidgets as getWidgetsApi,
  onNodesChange as onNodesChangeApi,
  updateWidget as updateWidgetApi,
} from "../api/api.db";
import { mapToNode } from "@/shared/lib/utils";
import { applyNodeChanges, type NodeChange } from "@xyflow/react";
import { createWidget } from "@/entities/board/api/api.db";
import { useUserStore } from "@/entities/user/model/store";

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

  isNodesLoad: boolean;

  editDialogOpen: {
    isDialogOpen: boolean;
    editingNodeId?: WidgetNode["id"];
  };
  setEditDialogOpen: (isOpen: boolean, id?: WidgetNode["id"]) => void;
}

export const useBoardStore = create<BoardState>()(
  immer((set, get) => ({
    nodes: [],
    isNodesLoad: false,

    editDialogOpen: {
      isDialogOpen: false,
      editingNodeId: "",
    },

    setEditDialogOpen(isOpen, id) {
      set((state) => {
        state.editDialogOpen.isDialogOpen = isOpen;
        state.editDialogOpen.editingNodeId = id;
      });
    },

    async getWidgets() {
      const widgets = await getWidgetsApi();

        set((state) => {
        state.nodes = widgets.map(mapToNode);
        state.isNodesLoad = true;
      });
    },

    async addWidget(data) {
      const user = useUserStore.getState().user;
      if (!user) throw new Error("User is null in addWidget()");

      await createWidget({
        id: crypto.randomUUID(),
        type: "widget",
        data: {
          ...data,
          userId: user.id,
        },
        position: { x: 0, y: 0 },
      });

      await get().getWidgets();
      toast.success("Виджет успешно создан!");
    },

    async updateWidget(id, data) {
      let updated: WidgetNode | undefined;

      set((state) => {
        const node = state.nodes.find((n) => n.id === id);
        if (node) {
          Object.assign(node.data, data);
          updated = node;
        }
      });

      if (updated) {
        await updateWidgetApi({ id, data: updated.data });
        toast.success("Виджет успешно обновлён!");
      }
    },

    async onNodesChange(changes) {
      const prevNodes = structuredClone(get().nodes);
      const nextNodes = applyNodeChanges(changes, prevNodes);
      set({ nodes: nextNodes });

      // сохраняем изменение позиций
      for (const change of changes) {
        if (change.type === "position" && change.position) {
          await onNodesChangeApi({
            id: change.id,
            position: change.position,
          });
        }
      }
    },

    async deleteWidget(id) {
      await deleteWidgetApi(id);

      set((state) => {
        state.nodes = state.nodes.filter((n) => n.id !== id);
      });

      toast.success("Виджет успешно удалён!");
    },
  }))
);
