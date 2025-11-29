import { SidebarTrigger } from "@/shared/ui/sidebar";
import { SidebarIcon } from "lucide-react";

export const TriggerSidebar = () => {
  return (
    <SidebarTrigger
      variant="outline"
      className="size-12 [&_svg:not([class*='size-'])]:size-6"
    >
      <SidebarIcon />
    </SidebarTrigger>
  );
};
