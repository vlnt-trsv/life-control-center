import { Panel } from "@xyflow/react";
import { AddWidget } from "@/features/addWidget/ui/AddWidget";
import { ChangeTheme } from "@/features/changeTheme/ui/ChangeTheme";
import { TriggerSidebar } from "@/features/triggerSidebar/ui/TriggerSidebar";

export const Menu = () => {
  return (
    <Panel className="flex gap-4 h-[48px]" position="bottom-center">
      <AddWidget />
      <ChangeTheme />
      <TriggerSidebar />
    </Panel>
  );
};
