
// components/BrevoChatWidget.js
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const BrevoChatWidget = () => {
  const pathname = usePathname();

  useEffect(() => {
    
    if (pathname === '/contact') {
      // Set the configuration before loading the script
      window.BrevoConversationsSetup = {
        chatWidth: 400,
        chatHeight: 550,
        colors: {
          buttonText: '#f0f0f0',
          buttonBg: '#A52A2A'
      }
      };
      // Add the Brevo widget script when the component mounts
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';
      script.onload = () => {
        window.BrevoConversationsID = '67b089f12e0177e58404c3b2';
        window.BrevoConversations = window.BrevoConversations || function () {
          (window.BrevoConversations.q = window.BrevoConversations.q || []).push(arguments);
        };
      };

      document.head.appendChild(script);
    
    return () => {
      // Clean up the script tag if the component is unmounted
      document.head.removeChild(script);
    };
  }
  }, []);

  return null; // No need to render anything
};

export default BrevoChatWidget;
