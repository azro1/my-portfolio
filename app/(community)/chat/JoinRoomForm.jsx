"use client";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useMessage } from '@/app/hooks/useMessage';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const JoinRoomForm = () => {
  const [roomName, setRoomName] = useState('');
  const router = useRouter();
  const { changeMessage } = useMessage()
  const supabase = createClientComponentClient();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
    .from('chat_rooms')
    .select('id, name')
    .eq('name', roomName.trim())
    .maybeSingle()

    if (error) {
      return;
    }

    if (!data) {
      changeMessage('error', "Hmm, we couldn't find a room with that name. Double-check the spelling or create a new one.");
    } else {
      const roomId = data.id;
      router.push(`/chat/${roomId}`);
    }

  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label htmlFor="roomName" className="text-ashGray">Room Name:</label>
      <input
        type="text"
        id="roomName"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        required
        className="rounded px-4 py-2.5"
      />
      <button type="submit" className="bg-goldenOchre/90 hover:bg-goldenOchre text-white font-bold py-2.5 px-4 rounded">
        Join Room
      </button>
    </form>
  );
};

export default JoinRoomForm;
