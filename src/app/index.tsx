import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";
import { Toaster } from "sonner";
import { SidebarProvider } from "@/shared/ui/sidebar.tsx";
import { router } from "./routers/Router.tsx";
import { RouterProvider } from "react-router-dom";
import { StoreProvider } from "./providers/StoreProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <ThemeProvider storageKey="vite-ui-theme">
        <SidebarProvider>
          <RouterProvider router={router} />
          <Toaster />
        </SidebarProvider>
      </ThemeProvider>
    </StoreProvider>
  </StrictMode>
);
