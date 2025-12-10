import type { WidgetNode } from "@/entities/node/types/types";
import type { User } from "@/entities/user/types/types";

export interface Note {
  id: string;
  userId: User["id"];
  widgetId: WidgetNode["id"];
  content: string;
}
