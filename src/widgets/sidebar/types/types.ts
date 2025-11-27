import type React from "react";

export type Props = {
  items: {
    title: string;
    url: string;
    icon: React.ComponentType
  }[];
};
