import { useTheme } from "@/shared/hooks/useTheme";
import { Button } from "@/shared/ui/button";
import { Moon, Sun } from "lucide-react";

export const ChangeTheme = () => {
  const { theme, setTheme } = useTheme();

  return (
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
  );
};
