"use client";

import CreateRoomForm from './CreateRoomForm';
import JoinRoomForm from './JoinRoomForm';
import ChatList from './ChatList';
import Heading from '@/app/components/Heading';
import RulesMessage from './RulesMessage'; // Import RulesMessage
import Sidebar from '@/app/components/Sidebar';

const ChatPage = () => {
  return (
      <div className='min-h-screen flex'>
        
        <div className="flex z-10">
          <Sidebar />
        </div>

        <div className="flex-1 flex items-center justify-center w-full bg-softGray text-softCharcoal py-40 md:py-0 md:h-screen md:min-h-[900px] ">
          {/* Hero Section */}
          <div className='main-container w-full'>
            <main>
              <div className=''>
                <div className="text-center pb-4">
                  <Heading className="font-bold text-nightSky mb-2 leading-tight text-[22px] md:text-3xl md:mb-2">
                    Welcome to My Chat Forum
                  </Heading>
                  <p className="mb-8 text-base md:text-lg">Connect with people, share ideas, build communities</p>
                  {/* You can add an image or illustration here */}
                </div>

                <RulesMessage /> {/* Render RulesMessage */}

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
              </div>

            </main>

          </div>
        </div>

      </div>
  );
}

export default ChatPage;
