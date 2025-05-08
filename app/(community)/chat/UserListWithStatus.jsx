"use client";

import { useState } from 'react';
import Image from 'next/image';
import { FaUserCircle } from 'react-icons/fa';

import {
    FiX,
    FiMenu
} from 'react-icons/fi';

// components
import OnlineStatus from './OnlineStatus'; // Import the status indicator component
import Avatar from '@/app/components/Avatar'; // Assuming you might use your custom Avatar component

const UserListWithStatus = ({ users }) => {
    const [isOpen, setIsOpen] = useState(false);

    
    // Convert the users object into an array and sort if needed (e.g., alphabetically)
    const userList = Object.values(users).sort((a, b) =>
        (a.first_name || '').localeCompare(b.first_name || '')
    );

    // Store online users to display count in h3
    const onlineUsers = userList.filter(user => user.status === 'online');

    // function to toggle sidebar
    const handleToggleSidebar = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className={`flex justify-end p-4 border-l border-charcoalGray bg-nightSky text-cloudGray h-full min-h-screen overflow-y-auto ${isOpen ? 'w-[300px]' : 'w-[64px]'} transition-width duration-200 ease-in delay-100`}>

            <div className='relative flex flex-col w-full h-full'>



                <div className='fixed w-full h-full flex flex-col gap-4'>
                    <div className='relative p-2'>
                        {/* Toggle + Title Row */}
                        <div
                            className={`absolute top-3 left-1 cursor-pointer z-10 rounded-md`}
                            onClick={handleToggleSidebar}
                        >
                            {isOpen ? (
                                <FiX className='text-cloudGray' size={22} />
                            ) : (
                                <FiMenu className='text-cloudGray' size={22} />
                            )}
                        </div>

                        {isOpen && (
                            <h3 className="ml-10 mt-1 text-lg font-semibold whitespace-nowrap">
                                Online Users ({onlineUsers.length})
                            </h3>
                        )}
                    </div>

                    {/* Scrollable user list */}
                    <div className="flex-1 overflow-y-auto px-4">
                        {isOpen && userList.length > 0 ? (
                            <ul className="flex flex-col gap-4">
                                {userList.map((user) => (
                                    <li key={user.id} className="flex items-center gap-3">
                                        <div className="flex-shrink-0">
                                            {user.avatar_url ? (
                                                user.avatar_url.startsWith("https") ? (
                                                    <div className="overflow-hidden rounded-full w-8 h-8">
                                                        <Image
                                                            src={user.avatar_url}
                                                            alt={`${user.first_name || 'User'}'s avatar`}
                                                            width={32}
                                                            height={32}
                                                            quality={80}
                                                        />
                                                    </div>
                                                ) : (
                                                    <Avatar url={user.avatar_url} width={32} height={32} />
                                                )
                                            ) : (
                                                <FaUserCircle size={32} className="text-gray-500" />
                                            )}
                                        </div>

                                        <p className="text-sm font-medium truncate">
                                            {user.first_name || 'User'}
                                        </p>
                                        <OnlineStatus status={user.status} />
                                    </li>
                                ))}
                            </ul>
                        ) : isOpen ? (
                            <p className="text-sm text-stoneGray">No other users currently online.</p>
                        ) : null}
                    </div>
                </div>

            </div>
        </div>
    );


};

export default UserListWithStatus;
