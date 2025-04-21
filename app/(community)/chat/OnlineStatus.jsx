// app/(community)/chat/OnlineStatus.jsx
"use client";

import React from 'react';

// This component now simply displays a status dot based on the passed prop.
const OnlineStatus = ({ status = 'offline' }) => { // Receive status prop, default to 'offline'

  const getStatusAttributes = () => {
    switch (status) {
      case 'online':
        return { colorClass: 'bg-green-500', title: 'Online' };
      case 'away':
        return { colorClass: 'bg-yellow-500', title: 'Away' };
      case 'offline':
      default:
        return { colorClass: 'bg-gray-500', title: 'Offline' };
    }
  };

  const { colorClass, title } = getStatusAttributes();

  return (
    <span
      className={`inline-block w-2.5 h-2.5 rounded-full ${colorClass}`} // Adjusted size slightly
      title={title} // Add tooltip for accessibility
    ></span>
  );
};

export default OnlineStatus;
