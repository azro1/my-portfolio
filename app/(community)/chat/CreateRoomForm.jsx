// app/chat/CreateRoomForm.jsx
"use client";

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator

const CreateRoomForm = () => {
  const [roomName, setRoomName] = useState('');
  const [user, setUser] = useState(null); // Add user state
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();
  }, [supabase]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const roomId = uuidv4(); // Generate UUID

      const { data, error } = await supabase
        .from('chat_rooms')
        .insert([{ id: roomId, name: roomName, created_by: user.id, created_at: new Date().toISOString() }]) // Add id: roomId
        .select()
        .single();

      if (error) {
        console.error('Error creating chat room:', error);
        return;
      }

      router.push(`/chat/${data.id}`);
    } catch (error) {
      console.error('Error creating chat room:', error);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label htmlFor="roomName" className="text-ashGray">Room Name:</label>
      <input
        type="text"
        id="roomName"
        value={roomName}
        maxLength={80}
        onChange={(e) => setRoomName(e.target.value)}
        required
        className="rounded px-4 py-2.5 border-[1px] border-[rgba(180,185,190,0.2)]"
      />
      <button type="submit" className="bg-goldenOchre/90 hover:bg-goldenOchre text-white font-medium text-[17px] p-[9px] rounded">
        Create Room
      </button>
    </form>
  );
};

export default CreateRoomForm;
