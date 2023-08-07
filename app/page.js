'use client'

import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [titles, setTitles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(''); 
  const [editingId, setEditingId] = useState(null); 

  useEffect(() => {
    if (!(session && session?.user)) {
      router.push('/login');
    }
  }, [session]);

  useEffect(() => {
    const getAllNotes = async () => {
      try {
        const response = await fetch('/api');
        const titles = await response.json();
        setTitles(titles.allTodos);
        titles.filter()
      } catch (err) {
        console.log(err);
      }
    };
    getAllNotes();
  }, []);

  const createNote = async () => {
    try {
      const response = await fetch('/api/', {
        method: 'POST',
        body: JSON.stringify({ title }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setTitles([...titles, data]);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`/api/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setTitles(prevTitles => prevTitles.filter(title => title._id !== id));
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const updateNote = async () => {
    try {
      await axios.put(`/api/${editingId}`, { title: updatedTitle });
      setTitles((prevTitles) =>
        prevTitles.map((t) => (t._id === editingId ? { ...t, title: updatedTitle } : t))
      );
      setEditingId(null); 
      setShowModal(false); 
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='grid grid-cols-3'>
      <div className='bg-blue-700 h-screen flex items-center justify-center flex-col gap-2'>
        <label className='font-bold text-4xl text-pink-800'>Enter the title</label>
        <input
          className='p-3'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className='bg-green-400 rounded-lg text-white font-bold p-2'
          onClick={createNote}
        >
          Create
        </button>
      </div>
      <div className='bg-yellow-500 h-screen font-bold flex flex-col col-span-2'>
        <h1 className='text-center text-5xl text-cyan-700 mt-1'>Todos</h1>
        {titles.map((title, idx) => (
          <div key={idx} className='flex gap-2 ml-[25%] mt-[10%]'>
            <h3 className='text-4xl'>{title.title}</h3>
            <button
              className='bg-red-400 rounded-lg text-white font-bold p-2'
              onClick={() => deleteNote(title._id)}
            >
              Delete
            </button>
            <button
              className='bg-blue-400 rounded-lg text-white font-bold p-2'
              onClick={() => {
                setEditingId(title._id);
                setUpdatedTitle(title.title);
                setShowModal(true);
              }}
            >
              Edit
            </button>
          </div>
        ))}
        {showModal && (
          <form
            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4'
            onSubmit={(e) => {
              e.preventDefault();
              updateNote();
            }}
          >
            <label className='font-bold text-lg'>Edit Title</label>
            <input
              className='p-2 border border-gray-300 mt-1 w-full'
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <div className='mt-2 flex justify-end'>
              <button className='bg-blue-500 text-white px-4 py-2 rounded' type='submit'>
                Save
              </button>
              <button className='ml-2 px-4 py-2' onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
