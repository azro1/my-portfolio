"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// components
import CreateRoomForm from './CreateRoomForm';
import JoinRoomForm from './JoinRoomForm';
import ChatList from './ChatList';
import Heading from '@/app/components/Heading';
import RulesMessage from './RulesMessage'; 
import Sidebar from '@/app/components/Sidebar';

const ChatPage = () => {

  const router = useRouter();

  // refresh is user navigates back from chatroom page 
  useEffect(() => {
    router.refresh();
  }, [router])

  return (
    <div className='min-h-screen flex'>

      <div className="flex z-10">
        <Sidebar />
      </div>

      <div className="flex-1 flex items-center justify-center w-full bg-softGray text-softCharcoal py-36 md:py-0 md:h-screen md:min-h-[900px] ">
        {/* Hero Section */}
        <div className='main-container w-full'>
          <main>

            <div className="flex items-center justify-center pb-5">
              <Image
                src="/images/chats.svg"
                alt="Simon Sutherland, Web Developer and Designer"
                width={60}
                height={60}
                priority
                quality={100}
              />
            </div>

            <div className="text-center pb-4">
              <Heading className="font-bold text-nightSky mb-1 leading-tight text-[22px] md:text-3xl ">
                Welcome to My Forum
              </Heading>
              <p className="mb-8 text-base md:text-lg">Connect with people, share ideas, build communities</p>
            </div>

            <RulesMessage />

            {/* Forms and Chat List */}
            <div className="flex flex-col md:flex-row gap-8 w-full">
              <div className="flex-1">
                <CreateRoomForm />
              </div>
              <div className="flex-1">
                <JoinRoomForm />
              </div>
            </div>

            <div className="w-full mt-8">
              <ChatList />
            </div>

          </main>

        </div>
      </div>

    </div>
  );
}

export default ChatPage;
