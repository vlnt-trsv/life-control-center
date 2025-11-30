import { create } from "zustand";
import type { WidgetData } from "@/entities/node/types/types";

interface NodeState {
  node: WidgetData;
  setNode: (data: WidgetData) => void;
}

export const useNodeStore = create<NodeState>((set) => {
  return {
    node: {},
    setNode: (data: WidgetData) => set({ node: data }),
  };
});
