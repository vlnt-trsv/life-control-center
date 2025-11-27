import { Button } from "@/shared/components/ui/button";
import { SidebarTrigger } from "@/shared/components/ui/sidebar";
import { Wrapper } from "@/shared/components/ui/wrapper";
import { Moon, Plus, SidebarIcon, Sun } from "lucide-react";
import { useTheme } from "@/app/providers/ThemeProvider";
import { useBoardStore } from "@/entities/board/model/store";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const { addWidget } = useBoardStore();

  return (
    <Wrapper className="fixed justify-center self-end px-4 py-4 z-5">
      <header className="flex gap-4 h-[48px]">
        <Button
          variant="outline"
          className="h-full"
          onClick={() => addWidget()}
        >
          <Plus className="size-6 h-f" />
        </Button>
        <Button
          variant="outline"
          className="h-full"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "light" ? (
            <Moon className="size-6 h-f" />
          ) : (
            <Sun className="size-6 h-f" />
          )}
        </Button>
        <SidebarTrigger
          variant="outline"
          className="size-12 [&_svg:not([class*='size-'])]:size-6"
        >
          <SidebarIcon />
        </SidebarTrigger>
      </header>
    </Wrapper>
  );
};
