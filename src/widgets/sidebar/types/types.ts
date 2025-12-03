import type React from "react";

export type Props = {
  items: {
    name: string;
    url?: string;
    icon?: React.ReactElement;
    ui?: React.ReactNode;
  }[];
};
