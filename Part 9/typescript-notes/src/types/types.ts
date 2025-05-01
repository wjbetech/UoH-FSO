export interface NoteType {
  id: string;
  content: string;
}

export type NewNote = Omit<NoteType, "id">;



