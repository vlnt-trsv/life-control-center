import { Board } from "@/entities/board/ui/Board";
import type { Props } from "../types/types";

export const Dashboard = ({ nodes }: Props) => {
  return <Board nodes={nodes} />;
};
