import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';

// Create a connection to your server
const socket = io('http://localhost:3001');


const App: React.FC = () => {

  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<string[]>([]);

  // Function to send a message
  const sendMessage = () => {
    socket.emit('send_message', { text: message });
    setChat(prev => [...prev, `Me: ${message}`]);
    setMessage('');
  };

    // Listen for messages coming from the server
    useEffect(() => {
      socket.on('receive_message', (data: { text: string }) => {
        setChat(prev => [...prev, `Stranger: ${data.text}`]);
      });
      // Clean up the listener when the component unmounts
      return () => {
        socket.off('receive_message');
      };
    }, []);

  return (

    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Random Chat</h1>
        <div className="my-4 p-2 border h-64 overflow-auto">
          {chat.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
    <input
      className="border p-2 mr-2"
      type="text"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />
    <button className="bg-blue-500 text-white p-2" onClick={sendMessage}>
      Send
    </button>
  </div>
  );
}

export default App;


