import { useBoardStore } from "@/entities/board/model/store";
import { Item } from "@/shared/ui/item";
import { Label } from "@/shared/ui/label";
import { SidebarProvider } from "@/shared/ui/sidebar";
import { Spinner } from "@/shared/ui/spinner";
import { Dashboard } from "@/widgets/dashboard/ui/Dashboard";
import { Menu } from "@/widgets/menu/ui/Menu";
import { useEffect } from "react";
// import { Sidebar } from "@/widgets/sidebar/ui/Sidebar";

export const Main = () => {
  const { isNodesLoad, getWidgets } = useBoardStore();

  useEffect(() => {
    void getWidgets();
  }, [getWidgets]);

  if (!isNodesLoad) {
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
    <SidebarProvider>
      <Menu />
      {/* <Sidebar items={[]} /> */}
      <Dashboard />
    </SidebarProvider>
  );
};
