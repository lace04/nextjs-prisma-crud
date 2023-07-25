'use client';

import { CreateNote, UpdateNote } from '@/interfaces/note.interface';
import { Note } from '@prisma/client';
import { createContext, useContext, useState } from 'react';

export const NoteContext = createContext<{
  notes: Note[];
  loadNotes: () => Promise<void>;
  createNote: (note: CreateNote) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
  selectedNote: Note | null;
  setSelectedNote: (note: Note | null) => void;
  updateNote: (id: number, note: UpdateNote) => Promise<void>;
}>({
  notes: [],
  loadNotes: async () => {},
  createNote: async (note: CreateNote) => {},
  deleteNote: async (id: number) => {},
  selectedNote: null,
  setSelectedNote: (note: Note | null) => {},
  updateNote: async (id: number, note: UpdateNote) => {},
});

//hook
export const useNotes = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error('useNotes debe estar dentro del proveedor NoteContext');
  }
  return context;
};

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  async function loadNotes() {
    const response = await fetch('/api/notes');
    const data = await response.json();
    setNotes(data);
  }

  async function createNote(note: CreateNote) {
    const res = await fetch(`http://localhost:3000/api/notes/`, {
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const newNote = await res.json();
    setNotes([...notes, newNote]);
  }

  async function deleteNote(id: number) {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    setNotes(notes.filter((note) => note.id !== data.id));
  }

  async function updateNote(id: number, note: UpdateNote) {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    setNotes(notes.map((note) => (note.id === id ? data : note)));
  }

  return (
    <NoteContext.Provider
      value={{
        notes,
        loadNotes,
        createNote,
        deleteNote,
        selectedNote,
        setSelectedNote,
        updateNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
