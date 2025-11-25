import { CircleUserRound } from "lucide-react";

export const Header = () => {
  return (
    <>
      <header className="flex relative bg-(--background) p-2 shadow-(--drop-shadow) rounded-(--radius) cursor-pointer z-10">
        <CircleUserRound />
      </header>
    </>
  );
};
