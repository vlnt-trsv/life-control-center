import { Button } from "@/shared/ui/button";
import { useTodoStore } from "../model/store";
import { Item, ItemActions, ItemContent } from "@/shared/ui/item";
import { ChevronsUpDown, Pencil, Plus, Trash } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/ui/collapsible";
import React from "react";
import { ButtonGroup } from "@/shared/ui/button-group";
import { Checkbox } from "@/shared/ui/checkbox";
import { Label } from "@/shared/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import type { Todo as TodoType } from "../types/types";
import { toast } from "sonner";

export const Todo = () => {
  const { todos, createTodo, updateTodo, deleteTodo } = useTodoStore();
  const [isOpen, setIsOpen] = React.useState(true);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingTodo, setEditingTodo] = React.useState<TodoType | null>(null);
  const [title, setTitle] = React.useState("");

  const handleOpenDialog = (todo?: TodoType) => {
    if (todo) {
      setEditingTodo(todo);
      setTitle(todo.title);
    } else {
      setEditingTodo(null);
      setTitle("");
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingTodo(null);
    setTitle("");
  };

  const handleSave = () => {
    if (editingTodo) {
      if (!title) return toast.error("Напишите название задачи!");
      updateTodo(editingTodo.id, title);
    } else {
      if (!title) return toast.error("Напишите название задачи!");
      createTodo(title);
    }
    handleCloseDialog();
  };

  const handleToggleComplete = (todo: TodoType) => {
    updateTodo(todo.id, todo.title, !todo.isComplete);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSave();
    }
  };

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent onKeyDown={(event) => handleKeyDown(event)}>
          <DialogHeader>
            <DialogTitle>
              {editingTodo ? "Редактировать задачу" : "Создать задачу"}
            </DialogTitle>
            <DialogDescription>
              {editingTodo
                ? "Отредактируйте название задачи."
                : "Создайте новую задачу."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <Label>Название задачи</Label>
            <Input
              id="title"
              placeholder="Введите название"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <Button variant="secondary" onClick={handleSave}>
            {editingTodo ? "Сохранить" : "Создать"}
          </Button>
        </DialogContent>
      </Dialog>

      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="flex w-[300px] flex-col gap-2"
      >
        <div className="flex items-center justify-between gap-4 ">
          <h4 className="text-sm font-semibold">Всего {todos.length} задач</h4>
          <ButtonGroup>
            <Button
              size="icon-sm"
              variant="ghost"
              onClick={() => handleOpenDialog()}
            >
              <Plus />
            </Button>
            {!!todos.length && (
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <ChevronsUpDown />
                </Button>
              </CollapsibleTrigger>
            )}
          </ButtonGroup>
        </div>
        <CollapsibleContent className="flex flex-col gap-2">
          {todos.map((todo) => (
            <Item
              key={todo.id}
              variant={todo.isComplete ? "muted" : "outline"}
              size="sm"
            >
              <ItemContent className="flex-row gap-2.5">
                <Checkbox
                  checked={todo.isComplete}
                  onClick={() => handleToggleComplete(todo)}
                />
                <Label className={todo.isComplete ? "opacity-10" : ""}>
                  {todo.title}
                </Label>
              </ItemContent>
              <ItemActions>
                <ButtonGroup>
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    onClick={() => handleOpenDialog(todo)}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <Trash />
                  </Button>
                </ButtonGroup>
              </ItemActions>
            </Item>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};
