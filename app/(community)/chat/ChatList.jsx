"use client";

import Heading from '@/app/components/Heading';

const ChatList = () => {
  const chatRooms = [
    { id: 'room1', name: 'General Chat' },
    { id: 'room2', name: 'Random Banter' },
    { id: 'room3', name: 'Project Discussions' },
  ];

  return (
    <div className="mt-4">
      <Heading className="font-bold mb-2 text-nightSky md:text-lg">
        Other Chat Rooms
      </Heading>
      <ul>
        {chatRooms.map((room) => (
          <li key={room.id} className="flex items-center py-2 border-b border-ashGray border-opacity-10">
            <a href={`/community/chat/${room.id}`} className="text-ashGray hover:text-nightSky">{room.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
