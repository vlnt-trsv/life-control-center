import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Separator } from "@radix-ui/react-separator";
import type { Props, WidgetType } from "../types/types";
import { useBoardStore } from "@/entities/board/model/store";
import { Settings, Trash } from "lucide-react";
import { WIDGET_TYPES } from "../config";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuShortcut,
  ContextMenuTrigger,
  ContextMenuItem,
} from "@/shared/ui/context-menu";
import dayjs from "dayjs";

export const Node: React.FC<Props> = ({ id, data }) => {
  const { deleteWidget, setEditDialogOpen } = useBoardStore();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Delete") {
      deleteWidget(id);
    }
  };

  const widget = WIDGET_TYPES.find(
    (widgetType) =>
      widgetType.value === (data.widgetType as unknown as WidgetType["value"])
  );

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <ContextMenuContent className="w-52">
            <ContextMenuItem onClick={() => setEditDialogOpen(true, id)}>
              <Settings />
              Настройки
            </ContextMenuItem>
            <ContextMenuItem
              variant="destructive"
              onClick={() => deleteWidget(id)}
            >
              <Trash />
              Удалить
              <ContextMenuShortcut>delete</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuContent>

          <Card
            className={"w-full max-w-sm cursor-default"}
            onKeyDown={(event) => handleKeyDown(event)}
            tabIndex={0}
          >
            <CardHeader>
              <CardTitle>{data.title}</CardTitle>
              <CardDescription>
                {dayjs(data.updatedAt).format(
                  "Обновлено: DD.MM.YYYY в HH:mm:ss"
                )}
              </CardDescription>
            </CardHeader>
            <Separator className="border" />
            <CardContent>{widget?.ui({ widgetId: id })}</CardContent>
          </Card>
        </ContextMenuTrigger>
      </ContextMenu>
    </>
  );
};
