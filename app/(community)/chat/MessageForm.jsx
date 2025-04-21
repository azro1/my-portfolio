// app/chat/MessageForm.jsx
"use client";

import { useState } from 'react';

const MessageForm = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2"> {/* Add Tailwind classes */}
      <input
        type="text"
        placeholder="Enter your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-full" // Add Tailwind classes
      />
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> {/* Add Tailwind classes */}
        Send
      </button>
    </form>
  );
};

export default MessageForm;
