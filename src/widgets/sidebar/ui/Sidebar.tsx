import React from "react";
import {
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/shared/ui/item";
import { ChevronsUpDown, LogOut, SettingsIcon, User } from "lucide-react";
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
import { Settings } from "@/widgets/settings/ui/Settings";
import { Profile } from "@/widgets/profile/ui/Profile";
import { useUserStore } from "@/entities/user/model/store";

export const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { signOut } = useAuthStore();
  const { user } = useUserStore();
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  return (
    <>
      <DropdownMenu
        open={isMenuOpen}
        onOpenChange={setIsMenuOpen}
        modal={false}
      >
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
                            <ItemTitle>
                              {user?.user_metadata.username|| "Нет имени пользователя"}
                            </ItemTitle>
                            <ItemDescription>
                              {user?.email || "email@mail.ru"}
                            </ItemDescription>
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
            <DropdownMenuItem onClick={() => setIsProfileOpen(!isProfileOpen)}>
              <User />
              Профиль
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              <SettingsIcon />
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

      <Settings open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
      <Profile open={isProfileOpen} onOpenChange={setIsProfileOpen} />
    </>
  );
};
