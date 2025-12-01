import { create } from "zustand";
import type { WidgetNode } from "@/entities/node/types/types";

interface NodeState {
  node: WidgetNode | null;
  setNode: (data: WidgetNode) => void;
}

export const useNodeStore = create<NodeState>((set) => ({
  node: null,
  setNode: (data: WidgetNode) => set({ node: data }),
}));
