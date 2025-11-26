import { SidebarTrigger } from "@/shared/components/ui/sidebar";
import { SidebarIcon } from "lucide-react";

export const Header = () => {
  return (
    <SidebarTrigger className="size-12 [&_svg:not([class*='size-'])]:size-6">
      <SidebarIcon />
    </SidebarTrigger>
  );
};
