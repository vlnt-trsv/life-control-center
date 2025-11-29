import { useBoardStore } from "@/entities/board/model/store";
import { Button } from "@/shared/ui/button";
import { BookmarkIcon, HeartIcon, Plus, StarIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import React from "react";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/command";
import { Label } from "@/shared/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";
import { WIDGET_TYPES, type WidgetData } from "@/entities/node/types/types";

export const AddWidget = () => {
  const { addWidget } = useBoardStore();
  const [open, setOpen] = React.useState(false);
  const [widgetData, setWidgetData] = React.useState<WidgetData>({
    title: "",
    content: "",
    type: undefined,
  });

  const handleAddWidget = () => {
    addWidget(widgetData);
  };

  return (
    <>
      <Dialog>
        <Popover open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="h-full">
              <Plus className="size-6 h-f" />
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Добавление виджета</DialogTitle>
            </DialogHeader>
            <div className="grid gap-2">
              <Label>Название виджета</Label>
              <Input
                id="title"
                value={widgetData.title}
                placeholder="Введите название"
                onChange={(e) =>
                  setWidgetData({ ...widgetData, title: e.target.value })
                }
              />
            </div>

            <div className="flex gap-4">
              <div className="grid gap-2">
                <Label>Тип виджета</Label>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[150px] justify-start">
                    {widgetData.type?.label}
                  </Button>
                </PopoverTrigger>
              </div>

              <div className="grid gap-2">
                {/* TODO: DISABLED - Действия с виджетом */}
                <Label>Действия с виджетом</Label>
                <ToggleGroup
                  type="multiple"
                  variant="outline"
                  spacing={3}
                  disabled
                >
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

            <PopoverContent className="p-0" side="right" align="start">
              <Command
                filter={(value, search) => {
                  const haystack = `${value} ${
                    widgetData.type?.label ?? ""
                  }`.toLowerCase();
                  const needle = search.toLowerCase();
                  return haystack.includes(needle) ? 1 : -1;
                }}
              >
                <CommandInput placeholder="Поиск виджета" />
                <CommandList>
                  <CommandEmpty>Нет подходящего виджета</CommandEmpty>
                  <CommandGroup heading="Текстовые виджеты">
                    {WIDGET_TYPES.map((status) => (
                      <CommandItem
                        key={status.value}
                        value={status.value}
                        role="button"
                        onSelect={(value: string) => {
                          setWidgetData((prev) => ({
                            ...prev,
                            type: WIDGET_TYPES.find((t) => t.value === value)!,
                          }));
                          setOpen(false);
                        }}
                      >
                        {status.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>

            <Button
              variant="secondary"
              className="h-full"
              onClick={() => handleAddWidget()}
            >
              Добавить
            </Button>
          </DialogContent>
        </Popover>
      </Dialog>
    </>
  );
};
