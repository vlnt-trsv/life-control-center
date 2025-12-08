import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<T extends (...args: never[]) => void>(
  func: T,
  delay: number
): T {
  let timeoutId: ReturnType<typeof setTimeout>;
  return ((...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }) as T;
}
// TODO: Написать типы для маппов
// Переписать мапу, сделать универсальную функцию (если есть несколько слов, то перед ними ставить _)
export function mapToNode(rec: any) {
  return {
    id: rec.id,
    type: rec.type,
    position: {
      x: rec.positionX,
      y: rec.positionY,
    },
    data: {
      widgetType: rec.widgetType,
      title: rec.title,
      userId: rec.userId
    },
  };
}
