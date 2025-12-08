import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { useUserStore } from "@/entities/user/model/store";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/shared/ui/item";
import { UserAvatar } from "@/entities/user/ui/UserAvatar/UserAvatar";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const Profile: React.FC<Props> = ({ open, onOpenChange }) => {
  const { user } = useUserStore();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Профиль</DialogTitle>
          <DialogDescription>
            В профиле отображается главная информация
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Item variant="outline">
            <ItemMedia>
              <UserAvatar />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>
                {user?.user_metadata.username || "Нет имени пользователя"}
              </ItemTitle>
              <ItemDescription>
                {user?.email || "email@mail.ru"}
              </ItemDescription>
            </ItemContent>
          </Item>

          <div className="grid grid-cols-2 gap-2">
            <Item variant="outline">
              <ItemContent>
                <ItemDescription>Дата регистрации</ItemDescription>
                <ItemTitle>
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString()
                    : "-"}
                </ItemTitle>
              </ItemContent>
            </Item>
            <Item variant="outline">
              <ItemContent>
                <ItemDescription>Последний вход</ItemDescription>
                <ItemTitle>
                  {user?.last_sign_in_at
                    ? new Date(user.last_sign_in_at).toLocaleString()
                    : "-"}
                </ItemTitle>
              </ItemContent>
            </Item>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
