import { Avatar } from "@/shared/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { User } from "lucide-react";

export const UserAvatar = () => {
  return (
    <Avatar className="rounded-lg bg-(--background) place-items-center justify-center size-12">
      {/* <AvatarImage src="https://github.com/valentintrsv.png" alt="@shadcn" /> */}
      <User />
    </Avatar>
  );
};
