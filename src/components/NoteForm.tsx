'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useNotes } from '@/context/NoteContext';

function NoteForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);

  const { createNote, selectedNote, setSelectedNote, updateNote } = useNotes();
  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content || '');
    }
  }, [selectedNote]);

  return (
    <form
      className='flex flex-col m-auto w-1/3 bg-zinc-900 p-4 rounded-md'
      onSubmit={async (e) => {
        e.preventDefault();
        if (selectedNote) {
          await updateNote(selectedNote.id, {
            title,
            content,
          });
          setSelectedNote(null);
        } else {
          await createNote({
            title,
            content,
          });
        }
        setTitle('');
        setContent('');
        titleRef.current?.focus();
      }}
    >
      <input
        type='text'
        name='title'
        autoFocus
        placeholder='Title'
        className='bg-zinc-800 p-2 rounded-md my-2 w-full'
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        ref={titleRef}
      />

      <textarea
        name='content'
        placeholder='Content'
        rows={3}
        className='bg-zinc-800 p-2 rounded-md my-2 w-full'
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <div className='flex justify-end gap-x-2'>
        <button
          type='submit'
          className='bg-zinc-800 p-2 mt-4 rounded-md hover:bg-zinc-500 transition duration-500 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={!title || !content}
        >
          {selectedNote ? 'Edit Note' : 'Add Note'}
        </button>
        {selectedNote && (
          <button
            className='bg-zinc-500 p-2 mt-4 rounded-md hover:bg-zinc-700 transition duration-500 ease-in-out'
            type='button'
            onClick={() => {
              setSelectedNote(null);
              setTitle('');
              setContent('');
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default NoteForm;
