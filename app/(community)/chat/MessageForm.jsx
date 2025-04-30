"use client";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useRef, useEffect } from 'react';
import { FiSmile, FiPaperclip } from 'react-icons/fi';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

// hooks
import { useMessage } from '@/app/hooks/useMessage';


const MessageForm = ({ user, profile, roomId, onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef();
  const { changeMessage } = useMessage()
  const supabase = createClientComponentClient();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };


  // Toggle the emoji picker visibility
  const handleTogglePicker = () => {
    setShowEmojiPicker((prev) => !prev);
  }


  // Close the emoji picker when clicking outside of it
  const handleClosePicker = () => {
    setShowEmojiPicker(false);
  }


  // Handle file input click
  const handleFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }



  const handleFileChange = async (event) => { 
    const file = event.target.files[0];

    if (file) {
      if (!file.type.includes('image')) {
          changeMessage('error', "The file selected must be an image.");
          return
      } else if (file.size > 1000000) {
          changeMessage('error', "The file is too large! Please select an image that's less than 100KB.");
          return
      }

      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}-${Math.random()}.${fileExt}`;

      try {
        const { error } = await supabase.storage
          .from('messages')
          .upload(filePath, file, { upsert: true });
        if (error) {
          throw new Error("An unexpected error occurred and we couldn't upload your file. Please try again later. If the issue persists, contact support.")
        } else {

          // send new object to message enpoint with the new file path
            const res = await fetch('/api/messages', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                profile,
                roomId,
                filePath
              }),
            });
      
            if (!res.ok) {
              const errorData = await res.json();
              console.error("Error sending message:", errorData.error || 'Unknown error');
              // Remove optimistic message if it failed
              // setMessages((prevMessages) => prevMessages.filter(msg => msg.id !== optimisticMessage.id));
              return;
            }

        }
      } catch (error) {
        changeMessage('error', error.message)
      }

    } else {
        changeMessage('error', 'No file selected. Please choose a file to continue.')
    }
  }


  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 relative"> {/* Add Tailwind classes */}
      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="bg-slateOnyx text-cloudGray rounded px-4 py-2 w-full"
        autoFocus={true}
      />
      

      <input
        type="file"
        onChange={handleFileChange}
        className='hidden'
        ref={fileInputRef}
      />
          

      <div className='absolute right-24 flex items-center gap-3'>
        <FiSmile className='hidden lg:block text-slateOnyx opacity-60 cursor-pointer' fill='#E0E0E3' size={22} onClick={handleTogglePicker} />
        <FiPaperclip className=' text-cloudGray opacity-60 cursor-pointer' size={18} onClick={handleFileInput} />
      </div>

      {showEmojiPicker && (
        <div className='hidden lg:block absolute bottom-20 right-0'>
          <Picker
            data={data}
            onEmojiSelect={(emoji) => setMessage(prev => prev + emoji.native)}
            theme="dark"
            onClickOutside={handleClosePicker}
          />
        </div>
      )}

      <button type="submit" className="bg-green-700/90 hover:bg-green-700 text-white font-b py-2 px-4 rounded"> {/* Add Tailwind classes */}
        Send
      </button>
    </form>
  );
};

export default MessageForm;
