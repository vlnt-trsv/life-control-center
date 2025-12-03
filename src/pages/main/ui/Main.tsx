import { useBoardStore } from "@/entities/board/model/store";
import { useTodoStore } from "@/entities/todo/model/store";
import { Item } from "@/shared/ui/item";
import { Label } from "@/shared/ui/label";
import { Spinner } from "@/shared/ui/spinner";
import { Dashboard } from "@/widgets/dashboard/ui/Dashboard";
import { Menu } from "@/widgets/menu/ui/Menu";
import { useEffect } from "react";
import { Sidebar } from "@/widgets/sidebar/ui/Sidebar";

export const Main = () => {
  const { isNodesLoad, getWidgets } = useBoardStore();
  const { isTodosLoad, getTodos } = useTodoStore();

  useEffect(() => {
    void getWidgets();
    void getTodos();
  }, [getWidgets, getTodos]);

  if (!isNodesLoad && !isTodosLoad) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Item variant="outline">
          <Spinner className="size-6" />
          <Label>Загрузка...</Label>
        </Item>
      </div>
    );
  }

  return (
    <>
      <Menu />
      <Sidebar />
      <Dashboard />
    </>
  );
};
