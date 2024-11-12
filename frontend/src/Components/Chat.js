import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Chat = ({ socket, userId }) => {
  const { otherUserId } = useParams(); // Gets the other user's ID from the URL
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Fetch messages from the server
        const response = await fetch(`http://127.0.0.1:5000/api/messages/${userId}/${otherUserId}`);
        const data = await response.json();
        setMessages(data);
      } catch (err) {
        console.error('Error fetching messages:', err);
      }
    };

    fetchMessages();

    // Join the chat
    socket.emit('joinChat', { userId, otherUserId });

    // Listen for incoming messages
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, [userId, otherUserId, socket]);

  const sendMessage = () => {
    // Emit the new message to the server via socket
    socket.emit('sendMessage', { sender: userId, receiver: otherUserId, message: newMessage });

    // Optimistically update the local messages
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: userId, receiver: otherUserId, message: newMessage },
    ]);

    // Clear the input after sending the message
    setNewMessage('');
  };

  return (
    <div className="chat-container w-full max-w-2xl mx-auto p-4 border border-gray-300 rounded-lg bg-gray-50">
      <h3 className="text-xl font-semibold mb-4">Chat with User {otherUserId}</h3>
      <div className="messages flex flex-col space-y-4 mb-4 overflow-y-auto max-h-96 p-2">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === userId ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`p-3 rounded-lg ${msg.sender === userId ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
            >
              <strong>{msg.sender === userId ? 'You' : 'Them'}:</strong> {msg.message}
            </div>
          </div>
        ))}
      </div>
      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
        className="w-full p-2 mb-2 border border-gray-300 rounded-lg resize-none"
        required
      />
      <button
        onClick={sendMessage}
        className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Send
      </button>
    </div>
  );
};

export default Chat;