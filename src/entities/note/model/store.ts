import { create } from "zustand";
import type { Note } from "../types/types";
import {
  createNote as createNoteApi,
  deleteNote as deleteNoteApi,
  getNotes as getNotesApi,
  updateNote as updateNoteApi,
} from "../api/api.db";
import { toast } from "sonner";
import type { WidgetNode } from "@/entities/node/types/types";
import type { User } from "@/entities/user/types/types";

interface NoteState {
  notes: Record<WidgetNode["id"], Note["content"]>;

  getNotes: (widgetId: WidgetNode["id"]) => Promise<void>;
  createNote: (
    content: Note["content"],
    widgetId: WidgetNode["id"],
    userId: User["id"]
  ) => Promise<void>;
  deleteNote: (id: Note["id"], widgetId: WidgetNode["id"]) => Promise<void>;
  updateNote: (
    id: Note["id"],
    widgetId: WidgetNode["id"],
    newContent: Note["content"]
  ) => Promise<void>;
}

export const useNoteStore = create<NoteState>((set, get) => {
  return {
    notes: {},

    async getNotes(widgetId) {
      const notes = await getNotesApi({ widgetId });
      set((state) => ({
        notes: {
          ...state.notes,
          [widgetId]: notes,
        },
      }));
    },

    async createNote(content, widgetId, userId) {
      await createNoteApi({
        id: crypto.randomUUID(),
        content,
        userId: userId,
        widgetId: widgetId,
      });

      get().getNotes(widgetId);
      toast.success("Заметка успешно создана!");
    },

    async deleteNote(id, widgetId) {
      await deleteNoteApi({ id, widgetId });
      get().getNotes(widgetId);
      toast.success("Заметка успешно удалена!");
    },

    async updateNote(id, widgetId, newContent) {
      await updateNoteApi({ id, widgetId, content: newContent });
      get().getNotes(widgetId);
      toast.success("Заметка успешно обновлена!");
    },
  };
});
