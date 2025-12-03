import { Avatar } from "@/shared/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export const UserAvatar = () => {
  return (
    <Avatar className="rounded-lg bg-black place-items-center justify-center size-12">
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
