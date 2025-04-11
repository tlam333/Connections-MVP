import React, { useState, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { Link } from 'react-router-dom';

const ChatPage: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<string[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Establish the connection when the component mounts:
    socketRef.current = io('http://localhost:3001');
    console.log('Socket connected');

    // Set up a listener for incoming messages:
    socketRef.current.on('receive_message', (data: { text: string }) => {
      setChat(prev => [...prev, `Stranger: ${data.text}`]);
    });

    // Cleanup: disconnect the socket when the component unmounts:
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log('Socket disconnected');
      }
    };
  }, []);

  const sendMessage = () => {
    if (socketRef.current) {
      socketRef.current.emit('send_message', { text: message });
      setChat(prev => [...prev, `Me: ${message}`]);
      setMessage('');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Group Chat</h1>
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

export default ChatPage;

