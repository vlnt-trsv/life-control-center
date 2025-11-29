import { SidebarProvider } from "@/shared/ui/sidebar";
import { Dashboard } from "@/widgets/dashboard/ui/Dashboard";
import { Menu } from "@/widgets/menu/ui/Menu";
// import { Sidebar } from "@/widgets/sidebar/ui/Sidebar";

export const Main = () => {
  return (
    <SidebarProvider>
      <Menu />
      {/* <Sidebar items={[]} /> */}
      <Dashboard />
    </SidebarProvider>
  );
};
