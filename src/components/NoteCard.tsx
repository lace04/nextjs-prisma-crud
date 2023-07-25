'use client';
import React from 'react';
import { Note } from '@prisma/client';
import { useNotes } from '@/context/NoteContext';
import { MdEditNote } from 'react-icons/md';
import { RiDeleteBin6Fill } from 'react-icons/ri';

function NoteCard({ note }: { note: Note }) {
  const { deleteNote, setSelectedNote } = useNotes();

  return (
    <div
      key={note.id}
      className='bg-zinc-700 w-1/3 flex justify-between m-auto rounded-md my-3 p-4'
    >
      <div className=''>
        <h2 className='text-xl font-bold uppercase'>{note.title}</h2>
        <p className='text-lg'>{note.content}</p>
        <p className='text-xs'>
          Created: {new Date(note.createdAt).toLocaleString()}
        </p>
        <p className='text-xs'>
          Updated: {new Date(note.updatedAt).toLocaleString()}
        </p>
      </div>
      <div className='flex gap-x-3'>
        <button
          onClick={() => {
            setSelectedNote(note);
          }}
        >
          <MdEditNote className='text-blue-500 text-xl' />
        </button>
        <button
          onClick={async () => {
            if (confirm('Are you sure you want to edit this note?')) {
              await deleteNote(Number(note.id));
            }
          }}
        >
          <RiDeleteBin6Fill className='text-red-500 hover:text-red-800' />
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
