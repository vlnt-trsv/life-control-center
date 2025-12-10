import React from "react";
import { toast } from "sonner";
import { BookmarkIcon, HeartIcon, Plus, StarIcon } from "lucide-react";

import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/command";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";

import { useBoardStore } from "@/entities/board/model/store";
import { useNodeStore } from "@/entities/node/model/store";
import { WIDGET_TYPES } from "@/entities/node/config";
import type { WidgetData, WidgetNode } from "@/entities/node/types/types";

export const AddWidget: React.FC = () => {
  const { addWidget } = useBoardStore();
  const { node, setNode } = useNodeStore();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const [typePopoverOpen, setTypePopoverOpen] = React.useState(false);

  const title = (node?.data as WidgetNode["data"])?.title ?? "";
  const selectedType = (node?.data as WidgetNode["data"])?.widgetType ?? null;

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNode({
      ...node,
      data: {
        ...(node?.data ?? {}),
        title: value,
      },
    } as WidgetData);
  };

  const handleSelectType = (value: string) => {
    const selected = WIDGET_TYPES.find((t) => t.value === value);
    if (!selected) return;

    setNode({
      ...node,
      data: {
        ...(node?.data ?? {}),
        widgetType: selected,
      },
    } as WidgetData);

    setTypePopoverOpen(false);
  };

  const handleAddWidget = () => {
    const data = node?.data as WidgetNode["data"];

    if (!data?.title) {
      toast.error("Введите название виджета");
      return;
    }

    if (!data?.widgetType) {
      toast.error("Выберите тип виджета");
      return;
    }

    addWidget(data);
    setIsDialogOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleAddWidget();
    }
  };

  const filterWidgetTypes = (value: string, search: string) => {
    const item = WIDGET_TYPES.find((t) => t.value === value);
    const haystack = `${value} ${item?.label ?? ""}`.toLowerCase();
    const needle = search.toLowerCase();
    return haystack.includes(needle) ? 1 : -1;
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-full">
          <Plus className="size-6" />
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        onKeyDown={(event) => handleKeyDown(event)}
      >
        <DialogHeader>
          <DialogTitle>Создание виджета</DialogTitle>
          <DialogDescription>
            Создайте свой виджет для составления чек-листа, просмотра записей,
            парсинг сайтов для анализа данных и т.д.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          <Label>Название виджета</Label>
          <Input
            id="title"
            value={title}
            placeholder="Введите название"
            onChange={handleChangeTitle}
          />
        </div>

        <div className="flex gap-4">
          <div className="grid gap-2">
            <Label>Тип виджета</Label>
            <Popover open={typePopoverOpen} onOpenChange={setTypePopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[180px] justify-start">
                  {selectedType?.icon}
                  {selectedType?.label ?? "Выбрать тип"}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="p-0" side="right" align="start">
                <Command filter={filterWidgetTypes}>
                  <CommandInput placeholder="Поиск виджета" />
                  <CommandList>
                    <CommandEmpty>Нет подходящего виджета</CommandEmpty>
                    <CommandGroup heading="Текстовые виджеты">
                      {WIDGET_TYPES.map((widgetType) => (
                        <CommandItem
                          key={widgetType.value}
                          value={widgetType.value}
                          role="button"
                          onSelect={handleSelectType}
                        >
                          {widgetType.icon}
                          {widgetType.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Действия с виджетом (пока disabled) */}
          <div className="grid gap-2">
            <Label>Действия с виджетом</Label>
            <ToggleGroup type="multiple" variant="outline" spacing={3} disabled>
              <ToggleGroupItem
                value="star"
                aria-label="Toggle star"
                className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-yellow-500 data-[state=on]:*:[svg]:stroke-yellow-500"
              >
                <StarIcon />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="heart"
                aria-label="Toggle heart"
                className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-red-500 data-[state=on]:*:[svg]:stroke-red-500"
              >
                <HeartIcon />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="bookmark"
                aria-label="Toggle bookmark"
                className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
              >
                <BookmarkIcon />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        <Button
          variant="secondary"
          className="w-full"
          onClick={() => handleAddWidget()}
        >
          Добавить
        </Button>
      </DialogContent>
    </Dialog>
  );
};
