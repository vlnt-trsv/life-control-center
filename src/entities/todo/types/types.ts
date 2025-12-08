import type { WidgetNode } from "@/entities/node/types/types";
import type { User } from "@/entities/user/types/types";

export interface Todo {
  id: string;
  title: string;
  isComplete?: boolean;
  userId: User["id"];
  widgetId: WidgetNode["id"];
}
