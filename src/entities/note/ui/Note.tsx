import type { WidgetNode } from "@/entities/node/types/types";
import { Textarea } from "@/shared/ui/textarea";
import React from "react";
import { useNoteStore } from "../model/store";
import { useUserStore } from "@/entities/user/model/store";
import { toast } from "sonner";
import type { Note } from "../types/types";

interface Props {
  widgetId: WidgetNode["id"];
}

export const Note: React.FC<Props> = ({ widgetId }) => {
  const [content, setContent] = React.useState("");
  const { notes, getNotes, createNote, updateNote, deleteNote } =
    useNoteStore();
  const { user } = useUserStore();

  console.log(notes[widgetId]?.[0]?.content);

  React.useEffect(() => {
    getNotes(widgetId);
  }, [widgetId]);

  const handleChange = (note: Note) => {
    updateNote(note.id, widgetId, note.content);
    if (!content) {
      createNote(content, note.widgetId, note.userId);
    }
  };

  return (
    <Textarea
      onChange={(event) =>
        handleChange({
          id: notes[widgetId]?.[0]?.id,
          content: event.target.value,
          userId: user?.id,
          widgetId: widgetId,
        })
      }
      className="resize-none min-w-xs"
      placeholder="Ваши записи"
      defaultValue={notes[widgetId]?.[0]?.content}
    />
  );
};
