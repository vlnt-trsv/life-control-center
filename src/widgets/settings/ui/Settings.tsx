import React from "react";

import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { useUserStore } from "@/entities/user/model/store";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const Settings: React.FC<Props> = ({ open, onOpenChange }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const { user, updateUser, deleteUser } = useUserStore();
  const [username, setUsername] = React.useState("");

  const handleSave = () => {
    if (user) {
      updateUser(user.id, { username });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Настройки</DialogTitle>
          <DialogDescription>
            Управляйте настройками своей учетной записи.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          <Label>Имя пользователя</Label>
          <Input
            id="username"
            placeholder="Введите имя"
            defaultValue={user?.user_metadata.username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label>Почта</Label>
          <Input id="email" value={user?.email || "email@mail.ru"} disabled />
        </div>

        <Button variant="default" onClick={handleSave}>
          Сохранить
        </Button>
        {/* <Button
          variant="destructive"
          onClick={() => setIsDeleteDialogOpen(!isDeleteDialogOpen)}
        >
          Запрос на удаление аккаунта
        </Button> */}

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Запрос на удаление аккаунта</DialogTitle>
              <DialogDescription>
                Вы уверены, что хотите удалить свой аккаунт?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="destructive"
                onClick={() => {
                  deleteUser(user.id);
                }}
              >
                Отправить
              </Button>
              <Button
                variant="default"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Отмена
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
};
