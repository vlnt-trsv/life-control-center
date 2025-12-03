import React from "react";
import {
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/shared/ui/sidebar";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/shared/ui/item";
import { ChevronsUpDown, LogOut, Settings, User } from "lucide-react";
import { UserAvatar } from "@/entities/user/ui/UserAvatar/UserAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { useAuthStore } from "@/entities/auth/model/store";

export const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, signOut } = useAuthStore();

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen} modal={false}>
      <SidebarUI variant="floating">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuItem>
                    <Item
                      size="sm"
                      asChild
                      onClick={() => setIsMenuOpen(isMenuOpen)}
                      className="cursor-pointer py-1 px-2"
                    >
                      <a>
                        <ItemMedia variant="image">
                          <UserAvatar />
                        </ItemMedia>
                        <ItemContent>
                          <ItemTitle>{user?.email}</ItemTitle>
                        </ItemContent>
                        <ItemActions>
                          <ChevronsUpDown className="size-4" />
                        </ItemActions>
                      </a>
                    </Item>
                  </SidebarMenuItem>
                </DropdownMenuTrigger>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </SidebarUI>

      <DropdownMenuContent className="w-56" align="start" side="right">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            Профиль
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            Настройки
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>API</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={() => signOut()}>
          <LogOut /> Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
