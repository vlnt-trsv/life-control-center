import type { WidgetNode } from "@/entities/node/types/types";
import type { Todo } from "@/entities/todo/types/types";

export interface WidgetRecord extends WidgetNode {
  createdAt: string;
  updatedAt: string;
}

// export interface WidgetRow {
//   id: string;
//   user_id: string | null;
//   type: string;
//   title: string | null;
//   widget_type: string;
//   position_x: number;
//   position_y: number;
//   width: number;
//   height: number;
//   created_at: string;
//   updated_at: string;
// }

export interface TodoRecord extends Todo {
  createdAt: string;
  updatedAt: string;
}
