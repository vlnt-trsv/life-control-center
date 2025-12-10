import { create } from "zustand";
import type { WidgetData } from "@/entities/node/types/types";

interface NodeState {
  node: WidgetData | null;
  setNode: (id: WidgetData) => void;
}

export const useNodeStore = create<NodeState>((set) => ({
  node: null,
  setNode: (id) => set({ node: id }),
}));
