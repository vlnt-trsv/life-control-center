import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const StoreProvider = ({ children }: Props) => {
  return <>{children}</>;
};
