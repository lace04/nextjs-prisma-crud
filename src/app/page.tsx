'use client';
import React, { useEffect } from 'react';
import { useNotes } from '@/context/NoteContext';
import NoteForm from '@/components/NoteForm';
import NoteCard from '@/components/NoteCard';

function HomePage() {
  const { notes, loadNotes } = useNotes();

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <>
      <h1 className='text-4xl text-center font-extralight m-6'>
        App Notes Prisma
      </h1>
      <div>
        <NoteForm />
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </>
  );
}

export default HomePage;
