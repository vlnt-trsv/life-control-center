import { create } from "zustand";
import type { WidgetNode } from "@/entities/node/types/types";

interface NodeState {
  node: WidgetNode["id"];
  setNode: (id: WidgetNode["id"]) => void;
}

export const useNodeStore = create<NodeState>((set) => ({
  node: "",
  setNode: (id) => set({ node: id }),
}));
