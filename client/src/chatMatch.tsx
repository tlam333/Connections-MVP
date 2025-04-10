import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Link } from "react-router-dom";

// Establish a connection to the server
const socket = io('http://localhost:3001');

const ChatMatchPage: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<string[]>([]);

  // Function to send a message
  const sendMessage = () => {
    socket.emit('send_message', { text: message });
    setChat(prev => [...prev, `Me: ${message}`]);
    setMessage('');
  };

  // Listen for messages
  useEffect(() => {
    socket.on('receive_message', (data: { text: string }) => {
      setChat(prev => [...prev, `Stranger: ${data.text}`]);
    });
    // Cleanup on unmount
    return () => {
      socket.off('receive_message');
    };
  }, []);

  return (
    <div className='p-10 min-h-screen'>

      <h1 className="text-xl font-bold mb-4 " >Group Chat</h1>
      <div className="my-4 p-2 border h-64 overflow-auto">
        {chat.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <div className="flex">
        <input
          className="border p-2 mr-2 flex-grow"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>
      <br /><br />

    <div className='flex justify-center'>
        <Link to="/">
            <button className="btn btn-primary">Return Home</button>
        </Link>
    </div>

    </div>
  );
};

export default ChatMatchPage;
