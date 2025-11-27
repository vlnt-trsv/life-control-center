import { SidebarProvider } from "@/shared/components/ui/sidebar";
import { Dashboard } from "@/widgets/dashboard/ui/Dashboard";
import { Header } from "@/widgets/header/ui/Header";
import { Home } from "lucide-react";
import { Sidebar } from "@/widgets/sidebar/ui/Sidebar";
import { useBoardStore } from "@/entities/board/model/store";

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
];

export const Main = () => {
  const state = useBoardStore();

  return (
    <>
      <SidebarProvider>
        <Header />
        <Sidebar items={items} />
        <Dashboard nodes={state.nodes} />
      </SidebarProvider>
    </>
  );
};
