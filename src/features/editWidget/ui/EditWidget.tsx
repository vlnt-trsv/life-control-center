import React from "react";
import { toast } from "sonner";

import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

import { useBoardStore } from "@/entities/board/model/store";

export const EditWidget: React.FC = () => {
  const { updateWidget, editDialogOpen, setEditDialogOpen } = useBoardStore();

  const [title, setTitle] = React.useState("");

  //   React.useEffect(() => {
  //     if (widgetNode) {
  //       setTitle(widgetNode.data.title);
  //     }
  //   }, [editDialogOpen.editingNodeId]);

  const handleSave = () => {
    if (!editDialogOpen.editingNodeId) return;

    if (!title.trim()) {
      toast.error("Название виджета не может быть пустым");
      return;
    }

    updateWidget(editDialogOpen.editingNodeId, { title });
    setEditDialogOpen(false);
  };

  return (
    <Dialog
      open={editDialogOpen.isDialogOpen}
      onOpenChange={() => setEditDialogOpen(false)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать виджет</DialogTitle>
          <DialogDescription>
            Вы можете изменить данные виджета
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Label htmlFor="title" className="text-right">
            Название
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <Button variant="secondary" onClick={handleSave}>
          Сохранить
        </Button>
      </DialogContent>
    </Dialog>
  );
};
